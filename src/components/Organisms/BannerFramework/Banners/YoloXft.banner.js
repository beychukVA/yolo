import { IconLib } from 'components/Atoms/IconLib'
import { Link } from 'components/Atoms/Link'
import React from 'react'
import styled, { keyframes } from 'styled-components'

export const YoloXftBanner = ({ closeBanner }) => {
  return (
    <XftWrapper to='/game/yoloxft'>
      <XftIcon collection='general' name='xftFramed' className='banner_image' masking />
      <Text>
        <strong>Announcing YOLO XFTs!</strong> YOLOrekt's new XFTs have gone live, and are now available for minting.
        Claim your XFT and earn rewards… Learn more &gt;
      </Text>
    </XftWrapper>
  )
}

const gradient = keyframes`
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
    `
const XftWrapper = styled(Link)`
  cursor: pointer;
  //width: 100vw;
  display: flex;
  flex-flow: row;
  align-items: center;
  color: #fff;
  font-size: 0.8rem;
  text-decoration: none;
  justify-content: center;
  padding: 0 50px;
  /* background: radial-gradient(
    circle at -10% -20%,
    #437499,
    #427297,
    #3e6b91,
    #396287,
    #33577c,
    #2c4a6f,
    #263e61,
    #1f3353,
    #1a2a47,
    #16223c,
    #131e36,
    #121c33
    );
    background-size: 400% 400%;
    animation: ${gradient} 5s ease infinite; */
  :hover {
    color: #fff;
    text-decoration: underline;
  }
`

const XftIcon = styled(IconLib)`
  width: 30px;
  height: 16px;
  margin: 0 5px 0 0;

  ${({ theme }) => theme.breakPoints['768px']} {
    width: 45px;
    height: 24px;
  }
`
const Text = styled.p`
  display: inline;
  flex-direction: row;
  strong {
    font-weight: 600;
    padding: 0 5px;
  }
  ${({ theme }) => theme.breakPoints['768px']} {
    flex-flow: column;
  }
`
