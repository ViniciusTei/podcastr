import { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { MdClose } from 'react-icons/md';
import useClickOutside from '../../hooks/useClickOutside';

interface Modal {
    isOpen: boolean
    handleClose: () => void
    children: ReactNode
    title?: string
}

export function Modal({title = '', isOpen, handleClose, children}: Modal) {
    const [willClose, setWillClose] = useState(isOpen)
    const modalRef = useRef<HTMLDivElement>(null)

    function closeModal() {
        setWillClose(false)

        setTimeout(() => {
            
            handleClose()
        }, 400)
    }

    useClickOutside(modalRef, closeModal)

    useEffect(() => {
        if(isOpen) {
            setWillClose(isOpen)

        }
    }, [isOpen])

    return (
        isOpen &&
        <div className={styles.container}>
            <div
                ref={modalRef}
                className={`
                    ${styles.modal} 
                    ${willClose ? styles.enterModal : styles.backModal}`
                }
            >
                <div className={styles.modalHeader}>
                    <strong>{title}</strong>
                    <MdClose onClick={closeModal}/>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}