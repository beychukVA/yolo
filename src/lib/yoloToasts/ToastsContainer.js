import styled from 'styled-components'
import { ToastContainer as ToastContainerLib, Slide } from 'react-toastify'
import { images } from 'common'
import 'react-toastify/dist/ReactToastify.css'

export const ToastContainer = styled(ToastContainerLib).attrs({
  containerId: 'yoloToastContainer',
  position: 'bottom-center',
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: false,
  pauseOnHover: false,
  closeButton: false,
  //className: 'toast-container',
  toastClassName: 'toastWrapper',
  bodyClassName: 'toastBody',
  progressClassName: 'toastProgress',
  transition: Slide
})`
  /* Toast-container */
  /* top: 0 !important;
  padding-top: 0 !important; */
  min-width: fit-content;
  .toastWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 300px;
    width: 100%;
    /* max-width: 400px; */
    margin: auto;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(25px);
    white-space: nowrap;
    padding: 0;
    border-radius: 0;
    &:not(:first-child) {
      margin-top: 4px;
    }
    &:first-child {
      border-radius: 10px 10px 0 0;
    }

    @-moz-document url-prefix() {
      background: rgba(255, 255, 255, 0.2) url(${images.FireFoxMenuBg}) center center / cover no-repeat;
    }
  }
  .toastBody {
    padding: 0;
  }
  .toastProgress {
    background: ${({ theme }) => theme.themeColors.primary};
    height: 2px;
  }
`
