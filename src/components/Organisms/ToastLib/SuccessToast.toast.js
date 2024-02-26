import { icons } from 'common'
import React from 'react'
import styled from 'styled-components'

export const SuccessToast = ({ message, closeToast }) => {
  return (
    // <Container>
    // <Wrapper>
    <SnackbarShow>
      <SnackbarMessageWrapper>
        <SnackbarMessage>
          <SnackbarBidSuccess>
            <Left>
              <BidSuccesIcon></BidSuccesIcon>
            </Left>
            <Right>
              <Title>{message?.title}</Title>
              <Subtitle>
                {message?.showTable && (
                  <>
                    Check <Bold>YOUR BIDS </Bold>
                  </>
                )}
                {message?.subtitle}
              </Subtitle>
            </Right>
          </SnackbarBidSuccess>
        </SnackbarMessage>
      </SnackbarMessageWrapper>
    </SnackbarShow>
    // </Wrapper>
    // </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  z-index: 999;
  overflow: hidden;
  color: black;
  position: absolute;
  bottom: 5px;
  right: unset;
  left: 50%;
  top: unset;
  transform: translateX(-50%);
`
const Wrapper = styled.div`
  color: black;
  box-sizing: border-box;
  margin: 0;
  border-radius: 10px;
  display: flex;
  min-width: auto;
  transition-property: all;
  transition-timing-function: ease;
  transition-duration: 0.5s;
  overflow: hidden;
  height: 74px;
  opacity: 1;
  margin-top: 5px;
  margin-bottom: 5px;
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
  padding: 20px;
`
const SnackbarMessage = styled.div`
  color: black;
  box-sizing: border-box;
  display: inline-block;
`
const SnackbarBidSuccess = styled.div`
  color: black;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
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
  align-items: flex-start;
`
const BidSuccesIcon = styled.div`
  color: black;
  box-sizing: border-box;
  background: url(${icons.bid_success_icon}) center center / 30px auto no-repeat;
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
`
const Bold = styled.span`
  color: black;
  font-weight: 700;
`
