import ms from 'ms.macro'
import React, { Children, cloneElement, useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import styled, { css } from 'styled-components'

const SLIDE_TIMEOUT = ms`5s`

export const Carousel = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const slider = useRef(null)
  const refPagesContainer = useRef()

  const onScroll = (index) => {
    setCurrentPage(index)
    // document.getElementById(`page-${index}`).scrollIntoView({ block: 'center', behavior: 'smooth' })
    const page = document.getElementById(`page-${index}`)
    refPagesContainer &&
      refPagesContainer?.current?.scroll({
        top: 0,
        left: index === 0 ? 0 : page?.offsetWidth * index,
        behavior: 'smooth'
      })
  }

  const stopSlider = () => {
    console.log('Slider Stop')
    clearInterval(slider.current)
    if (slider) {
      slider.current = 0
    }
  }

  const startSlider = () => {
    let nextIndex = currentPage
    if (!slider.current || slider.current === 0) {
      !slider.current && console.log('Slider start')
      const timer = setInterval(() => {
        nextIndex = (nextIndex + 1) % children.length
        setTimeout(() => {
          onScroll(nextIndex)
        }, 10)
      }, SLIDE_TIMEOUT)
      slider.current = timer
    }
  }

  useEffect(() => {
    startSlider()
    return () => stopSlider()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container
    // onMouseEnter={() => stopSlider()} onMouseLeave={() => startSlider()}
    >
      <Pages ref={refPagesContainer}>
        {Children.map(children, (child, index) => cloneElement(child, { key: index, id: `page-${index}` }))}
      </Pages>
      <Controls>
        {children.map((child, index) => (
          <Control key={index} className={currentPage === index ? 'selected' : ''} onClick={() => onScroll(index)} />
        ))}
      </Controls>
    </Container>
  )
}

const selected = css`
  .selected {
    &::before {
      opacity: 1;
    }
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
`

const Pages = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Controls = styled.div`
  position: absolute;
  top: 100%;
  left: calc(100% / 2 - width / 2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0 0 0;
  ${selected}
`

const Control = styled.label`
  &::before {
    content: ' ';
    height: 10px;
    width: 10px;
    border-radius: 100%;
    display: inline-block;
    z-index: 2;
    cursor: pointer;
    opacity: 0.35;
    margin: 0 5px;
    background-color: #fafafa;
  }
`
