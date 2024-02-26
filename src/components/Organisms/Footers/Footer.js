import React from 'react'
import styled from 'styled-components'
import { config } from 'config'
import { Link } from 'components/Atoms/Link'
import { IconLib } from 'components/Atoms/IconLib'

export const Footer = ({ position, bgColor }) => {
  return (
    <FooterWrapper position={position} bgColor={bgColor}>
      <LandingDetails>
        <Author>
          <span>Made with</span>
          {/* <Link variant='simple' href='https://ethereum.org' target='blank'>
            <EthereumIcon />
          </Link> */}
          <Link variant='simple' href='https://polygon.technology' target='blank'>
            <PolygonIcon />
          </Link>
        </Author>
        <RowContainer>
          <Link className='link' variant='underlined' href='https://docs.yolorekt.finance/docs/legal/privacy-policy'>
            Privacy Policy
          </Link>
          <PrivTerms>&nbsp;&nbsp;•&nbsp;&nbsp;</PrivTerms>
          <Link className='link' variant='underlined' href='https://docs.yolorekt.finance/docs/legal/terms-of-service'>
            Terms of Service
          </Link>
        </RowContainer>
        <Copyright>© Copyright 2023 All rights reserved</Copyright>
      </LandingDetails>
      <About>
        YOLOrekt is building a comprehensive short-term prediction platform for crypto, stocks, and more. YOLO is a
        social and fun way to bid on the future price of an asset. Provide in-game liquidity to earn game fees and YOLO
        rewards.
      </About>
      <SocialArea>
        {config.YOLO_SOCIAL_LINKS.map((item, index) => (
          <SocialLink href={item.url} key={index}>
            <SocialIcon name={item.icon} />
          </SocialLink>
        ))}
      </SocialArea>
    </FooterWrapper>
  )
}

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 0.75rem;
  padding: 30px 60px;
  margin: 30px auto 0 auto;
  align-items: center;
  position: relative;
  bottom: 0;
  z-index: 11;
  width: 80%;
  flex-wrap: nowrap;
  ${({ theme }) => theme.breakPoints['xs']} {
    position: relative;
    height: auto;
    flex-direction: column;
    align-items: center;
  }
`
const LandingDetails = styled.div`
  display: flex;
  flex-direction: row;
  min-width: auto;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  span {
    a {
      color: rgba(255, 255, 255, 1);
      &:hover {
        color: #2e68eb;
        text-decoration: none;
      }
    }
  }
  ${({ theme }) => theme.breakPoints['xs']} {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`
const Author = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  padding: 5px 15px;
  span {
    /* margin-right: 6px; */
  }
  ${({ theme }) => theme.breakPoints['xs']} {
    margin-right: 0;
    padding-right: 20px;
  }
  a {
    &:last-child {
      margin-left: 2px;
    }
  }
`
const SocialIcon = styled(IconLib).attrs({
  collection: 'brands',
  dimension: '24px',
  masking: true
})`
  width: 24px;
  height: 22px;
  &:hover {
    background-color: #2e68eb;
  }
  ${({ theme }) => theme.links.iconLink}
`
const EthereumIcon = styled(IconLib).attrs({
  collection: 'crypto',
  dimension: '21px',
  name: 'ethereum',
  masking: true
})`
  background-color: #fff;
  -webkit-mask-position: center center;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 0 15px;
  display: block;
  ${({ theme }) => theme.links.iconLink}
`
const PolygonIcon = styled(IconLib).attrs({
  collection: 'crypto',
  dimension: '21px',
  name: 'polygon',
  masking: true
})`
  -webkit-mask-size: auto 14px;
  -webkit-mask-position: center center;
  width: 18px;
  height: 16px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 0 6px;
  ${({ theme }) => theme.links.iconLink}
  &:hover {
    fill: #8247e5;
  }
`
const SocialLink = styled(Link)`
  margin: 0 0 0 15px;
  -webkit-mask-size: auto 20px;
  width: 24px;
  height: 22px;
`
const SocialArea = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 15px 0 0 0;
`
const Copyright = styled.div`
  white-space: nowrap;
  padding: 5px 15px;
  ${({ theme }) => theme.breakPoints['xs']} {
    margin-bottom: 5px;
  }
`
const PrivTerms = styled.div`
  white-space: nowrap;
  ${({ theme }) => theme.breakPoints['xs']} {
    margin-bottom: 5px;
  }
`
const RowContainer = styled.div`
  display: flex;
  flex-direction: row;

  .link {
    color: rgba(255, 255, 255, 1);
    text-decoration: none;
    border-bottom: 1px dotted transparent;
  }
  .link:hover {
    color: rgba(255, 255, 255, 1);
    border-bottom: 1px dotted hsla(0, 0%, 100%, 0.2);
  }
`

const About = styled.div`
  opacity: 0.3;
  width: 100%;
  max-width: 600px;
  text-align: center;
  line-height: 130%;
  transition: all 0.5s;
  &:hover {
    opacity: 1;
  }
`
