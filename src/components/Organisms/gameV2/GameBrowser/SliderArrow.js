import React from 'react'
import styled from 'styled-components'
import { icons } from 'common'

export const SliderArrow = ({ onClick, direction }) => {
  return (
    <Container direction={direction} onClick={onClick}>
      <ArrowIcon />
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 45px;
  display: flex;
  background: ${({ direction }) => direction === 'prev' ? `linear-gradient(90deg, rgba(32, 37, 47, 1) 0%, rgba(32, 37, 47, 0) 100%)` : `linear-gradient(90deg, rgba(32, 37, 47, 0) 0%, rgba(32, 37, 47, 1) 100%);`};
  cursor: pointer;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  z-index: 1;
  justify-content: flex-end;
  padding: ${({ direction }) => direction === 'prev' ? `0 20px 0 0` : `0 15px 0 0`};
  align-items: center;
  ${({ direction }) => direction === 'next' && `right: 0;`}
  ${({ direction }) => direction === 'prev' && `div { transform: rotate(180deg); }`}
  &:hover {
    div {
      background: rgba(255, 255, 255, 1);
    }
  }
  ${({ theme }) => theme.breakPoints['768px']} {
    display: none;
  }
`

const ArrowIcon = styled.div`
  mask: url(${icons.SliderArrowIcon}) center center / auto 20px no-repeat;
  background: rgba(255, 255, 255, 0.6);
  width: 10px;
  height: 20px;
`
