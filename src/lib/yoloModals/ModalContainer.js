import { ModalFramework } from 'components/Atoms/ModalFramework'
import { ModalLib } from 'components/Organisms/ModalLib'
import { useState, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { ModalWrapper } from './ModalWrapper'
import { useYoloModal } from './useYoloModal'

function createWrapperAndAppendToBody(wrapperId) {
  const wrapperElement = document.createElement('div')
  wrapperElement.setAttribute('id', wrapperId)

  document.body.appendChild(wrapperElement)
  return wrapperElement
}

export const ModalContainer = () => {
  const wrapperId = 'modalWrapper'
  const [wrapperElement, setWrapperElement] = useState(null)

  const { modalState, clearModal } = useYoloModal()

  const closeModal = (modalId) => clearModal('all')
  const backDropClick = (modalId) => modalState.backdropClose && closeModal(modalId)

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId)
    let systemCreated = false
    if (!element) {
      systemCreated = true
      element = createWrapperAndAppendToBody(wrapperId)
    }
    setWrapperElement(element)

    return () => {
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  }, [wrapperId])

  // wrapperElement state will be null on the very first render.
  if (wrapperElement === null) return null
  if (!modalState.show) return null
  return createPortal(
    <ModalWrapper id='mainModalContainer' closeModal={backDropClick} backdropBlurred={modalState.backdropBlurred}>
      {/* // <ModalWrapper id='mainModalContainer' closeModal={backDropClick} backdropBlurred={true}> */}
      <ModalLib closeModal={closeModal} modalId={modalState.id} {...modalState.props} />
    </ModalWrapper>,
    wrapperElement
  )
}
