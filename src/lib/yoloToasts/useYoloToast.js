import { ToastLib } from 'components/Organisms/ToastLib'
import { toast } from 'react-toastify'

export const useYoloToast = () => {
  const yToast = (toastObj) => {
    const { id, props, ...config } = toastObj
    toast(<ToastLib toastId={id} {...props} />, config)
  }
  const yToastDismiss = toast.dismiss
  return { yToast, yToastDismiss }
}
