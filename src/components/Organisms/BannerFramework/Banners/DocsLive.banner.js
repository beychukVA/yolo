import { Link } from 'components/Atoms/Link'
import React from 'react'
import styled from 'styled-components'

export const DocsLiveBanner = ({ closeBanner }) => {
  return (
    <BannerWrapper href='https://docs.yolorekt.finance' className='rotating_banner two'>
      <Text>Our DOCS section is now LIVE. Come read all about it &gt;</Text>
    </BannerWrapper>
  )
}

const BannerWrapper = styled(Link)`
  cursor: pointer;
  display: flex;
  flex-flow: row;
  align-items: center;
  color: #fff;
  font-size: 0.8rem;
  text-align: center;
  text-decoration: none;
  justify-content: center;
  padding: 0 50px;
  background: #2a6dff;
  :hover {
    color: #fff;
    text-decoration: underline;
  }
`

const Text = styled.p`
  display: flex;
  flex-flow: row;
  strong {
    font-weight: 600;
    padding: 0 5px;
  }
`
