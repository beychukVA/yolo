import React from 'react'
import styled from 'styled-components'

export const ModalWrapper = ({ className, closeModal, backdropBlurred, children }) => {
  const backdropClick = () => {
    closeModal()
  }

  return (
    <BackDrop className={className} onClick={backdropClick} backdropBlurred={backdropBlurred}>
      {children}
    </BackDrop>
  )
}

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: ${({ backdropBlurred }) => (backdropBlurred ? 'blur(5px)' : 'none')};
  z-index: 2;
`
