import React from 'react'
import styled from 'styled-components'
import { icons } from 'common'
import { useLvgWaitlist } from './hooks/useLvgWaitlist'

export const JoinTheWaitlistModal = ({ closeModal }) => {
  const { addToWaitlist } = useLvgWaitlist()

  return (
    <ModalOverlay onClick={() => closeModal()}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseWindowIcon onClick={() => closeModal()} />
        <Header>Become a part of FUTURE$ (Beta)</Header>
        <Body>
          <Content>
            <Description>
              To join the waitlist, click below and we'll let you know. In the meantime, have fun!
            </Description>
            <Button onClick={() => addToWaitlist()}>JOIN THE WAITLIST</Button>
          </Content>
        </Body>
      </ModalBox>
    </ModalOverlay>
  )
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  opacity: 1;
  background: radial-gradient(
    circle at 50% 50%,
    hsla(210, 19%, 16%, 0.6),
    hsla(214, 19%, 15%, 0.6),
    hsla(210, 18%, 13%, 0.6),
    hsla(213, 19%, 12%, 0.6),
    hsla(216, 19%, 10%, 0.6),
    hsla(210, 18%, 9%, 0.7),
    hsla(214, 19%, 7%, 0.7),
    hsla(204, 17%, 6%, 0.8),
    hsla(210, 18%, 4%, 0.9),
    hsla(220, 20%, 3%, 1),
    hsla(180, 14%, 1%, 1),
    hsla(0, 0%, 0%, 1)
  );
  width: 100vw;
  height: 100vh;
  -webkit-transition: opacity 0.5s ease;
  -moz-transition: opacity 0.5s ease;
  -o-transition: opacity 0.5s ease;
  transition: opacity 0.5s ease;
`
const ModalBox = styled.div`
  position: fixed;
  width: 100%;
  min-width: 300px;
  max-width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-box-shadow: 0 0 100px rgb(0 0 0 / 40%);
  -moz-box-shadow: 0 0 100px rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 100px rgb(0 0 0 / 40%);
  border-radius: 10px;
  z-index: 99;
  transition: top 0.5s ease;
  -webkit-transition: top 0.5s ease;
  -moz-transition: top 0.5s ease;
  -o-transition: top 0.5s ease;
`
const Header = styled.div`
  z-index: 1;
  position: relative;
  top: 0;
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  padding: 30px;
  background: hsla(214, 18%, 16%, 0.8);
  border-radius: 10px 10px 0 0;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
  line-height: 130%;
  padding: 20px 30px 15px 30px;
`
const Body = styled.div`
  max-height: 800px;
  height: fit-content;
  background-color: hsla(214, 18%, 16%, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 0 0 10px 10px;
  display: flex;
  flex-direction: row;
  padding: 0 0 20px 0;
`
const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  padding: 20px 30px 0 30px;
  overflow: hidden;
  height: 100%;
  transition: width 300ms ease-in-out;
`

const Description = styled.p`
  line-height: 140%;
  margin: 0 0 15px 0;
`
const Button = styled.button`
  outline: none;
  border: none;
  background: linear-gradient(
    180deg,
    #2159d1,
    #2159d0,
    #2158cf,
    #2057cd,
    #2056ca,
    #1f55c7,
    #1f53c3,
    #1e52c0,
    #1e51bd,
    #1d50bb,
    #1d4fba,
    #1d4fb9
  );
  text-decoration: none;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 100%;
  padding: 10px 15px;
  border-radius: 10px;
`

const CloseWindowIcon = styled.div`
  top: -5px;
  left: -5px;
  -webkit-mask: url(${icons.close_window_icon}) center center / 22px auto no-repeat;
  mask: url(${icons.close_window_icon}) center center / 22px auto no-repeat;
  background: hsl(0, 0%, 100%);
  width: 22px;
  height: 22px;
  display: block;
  position: absolute;
  color: #fff;
  text-decoration: none;
  text-decoration-color: rgba(255, 255, 255, 0.4);
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  z-index: 2;
  cursor: pointer;

  &:hover {
    background: #c0392b;
  }
`
