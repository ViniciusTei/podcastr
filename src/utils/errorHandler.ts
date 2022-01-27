import { AxiosError } from "axios";

export default function ErrorHandler(
  error: AxiosError, 
  toggleToast: (value: {message: string, type: string}) => void
) {
  if (error.response.status === 500) {
    toggleToast({
      message: 'Internal Server Error!',
      type: 'error'
    })

    return
  }

  if (error.response.data.message) {
    toggleToast({
      message: error.response.data.message,
      type: 'error'
    })
  }

  return
}