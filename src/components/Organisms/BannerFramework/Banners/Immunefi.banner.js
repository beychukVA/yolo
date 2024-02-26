import { IconLib } from 'components/Atoms/IconLib'
import { Link } from 'components/Atoms/Link'
import React from 'react'
import styled from 'styled-components'

const SHOW_ICON = false

export const ImmunefiBanner = ({ closeBanner }) => {
  return (
    <BannerWrapper href='https://immunefi.com/bounty/yolorekt/'>
      {SHOW_ICON && <BannerIcon collection='general' name='xftFramed' className='banner_image' masking />}
      <Text>The YOLO Bug Bounty is now LIVE - in partnership with, the predominant community platform, Immunefi.</Text>
    </BannerWrapper>
  )
}

const BannerWrapper = styled(Link)`
  cursor: pointer;
  min-width: 370px;
  display: flex;
  flex-flow: row;
  align-items: center;
  color: #fff;
  font-size: 0.8rem;
  text-decoration: none;
  justify-content: center;
  padding: 0 50px;
  :hover {
    color: #fff;
    text-decoration: underline;
  }
`

const BannerIcon = styled(IconLib)`
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
