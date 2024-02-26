import { icons } from 'common'
import React from 'react'
import styled from 'styled-components'

export const ErrorToast = ({ message, closeToast }) => {
  return (
    // <Container>
    // <Wrapper>
    <SnackbarShow>
      <SnackbarMessageWrapper>
        <SnackbarMessage>
          <SnackbarBidError>
            <ContainerWrapper>
              <Left>
                <BidErrorIcon></BidErrorIcon>
              </Left>
              <Right>
                <Title>{message?.title}</Title>
                <Subtitle>{message?.subtitle}</Subtitle>
              </Right>
            </ContainerWrapper>
            <Button onClick={() => closeToast()}>Dismiss</Button>
          </SnackbarBidError>
        </SnackbarMessage>
      </SnackbarMessageWrapper>
    </SnackbarShow>
    // </Wrapper>
    // </Container>
  )
}

const ContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 20px;
`

const SnackbarShow = styled.div`
  display: inline-flex;
  box-sizing: border-box;
  border-radius: 10px;
  color: black;
  font-size: 0.7rem;
  background-color: hsla(0, 0%, 100%, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  vertical-align: bottom;
  box-shadow: 0 0 30px 0 hsl(0deg 0% 0% / 80%);
  /* margin: 0 10px; */
  width: 100%;
  flex-grow: 1;
  align-items: center;
`
const SnackbarMessageWrapper = styled.div`
  color: black;
  box-sizing: border-box;
  position: relative;
  flex: 1;
`
const SnackbarMessage = styled.div`
  color: black;
  box-sizing: border-box;
  display: inline-block;
  width: 100%;
`
const SnackbarBidError = styled.div`
  color: black;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`
const Left = styled.div`
  color: black;
  box-sizing: border-box;
  display: flex;
  width: 30px;
  height: 30px;
  margin: 0 10px 0 0;
  justify-content: center;
  align-items: center;
`
const Right = styled.div`
  color: black;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`
const BidErrorIcon = styled.div`
  color: black;
  box-sizing: border-box;
  background: url(${icons.bid_error_icon}) center center / 30px auto no-repeat;
  width: 30px;
  height: 30px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`
const Title = styled.div`
  color: black;
  box-sizing: border-box;
  font-size: 0.9rem;
  font-weight: 400;
  padding: 0 0 8px 0;
  line-height: 100%;
  display: block;
  width: 100%;
  text-align: start;
`
const Subtitle = styled.div`
  color: black;
  box-sizing: border-box;
  font-size: 0.8rem;
  font-weight: 400;
  /* padding: 0 0 8px 0; */
  line-height: 100%;
  display: block;
  white-space: nowrap;
  width: 100%;
  text-align: left;
`
const Bold = styled.span`
  color: black;
  font-weight: 700;
`
const Button = styled.button`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 8px 14px 7px 14px;
  color: hsl(0, 0%, 100%);
  background: black;
  line-height: 100%;
  border-radius: 8px;
  cursor: pointer;
  height: fit-content;
  margin: 0 20px 0 0;
  text-transform: uppercase;
  font-size: 0.7rem;
`
