import { createContext, ReactNode, useContext, useState } from 'react';
import { Toast } from '../components/Toast';

type Toast = {
  message: string
  type: 'error' | 'success'
  timeMsToClose?: number
}

type ToastContext = {
  toggleToast: (toast: Toast) => void
}

const ToastContext = createContext({} as ToastContext);


export default function ToastProvider({children}: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [toastData, setToastData] = useState({} as Toast)

  function toggleToast(toast: Toast) {
    setIsOpen(true)
    setToastData(toast)
    setTimeout(() => {
      setIsOpen(false)
      setIsClosing(true)

      setTimeout(() => {
        setIsClosing(false)
      }, 400)
    } , toast.timeMsToClose ? toast.timeMsToClose : 1000)
  }

  return (
    <ToastContext.Provider value={{toggleToast}}>
      <>
        {isOpen && (
          <Toast
            message={toastData.message}
            type={toastData.type}
            isLeaving={isClosing}
          />
        )}
        {children}
      </>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}