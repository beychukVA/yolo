import React, { useMemo } from 'react'
import styled from 'styled-components'

import { images } from 'common'
import { UserIdForm } from 'components/Molecules/UserIdForm'
import { IconLib } from 'components/Atoms/IconLib'
import { Link } from 'components/Atoms/Link'

import { XFT_LEVELS } from 'constants/xftLevels'
import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'
import { ASYNC_STATUS_ID } from 'constants/index'
import { currencyFormatter } from 'utils'
import { useBidderData } from 'datasource/biddersDashboard'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { useXftProgress } from 'hooks/xftCampaign/useXftProgress'
import { useWalletConnection } from 'hooks/useWalletConnection'

export const AccountMenuBody = ({ closeMenu }) => {
  const { xftLevel, roundCountLeft, cumulativeAmountLeft } = useXftProgress()

  const nftProps = useMemo(() => XFT_LEVELS[xftLevel.dec], [xftLevel.dec])
  const { data: bidderData, hasStatus } = useBidderData()
  const { counts, amounts } = bidderData || {}
  const isPending = hasStatus(ASYNC_STATUS_ID.PENDING)

  return (
    <StyledMenu onClick={(e) => e.stopPropagation()}>
      <UserForm onSaveClick={closeMenu} label='Username' />
      <NftLevel>
        <NftRow>
          <IconNft {...nftProps.iconProps} />
          <NftDetailsWrap>
            <NftTitle>{`${nftProps.caption} ${xftLevel.dec === 0 ? '' : `(Level ${xftLevel.dec})`}`} </NftTitle>
            <NftDescription>
              <SingleContentToggle
                toggle={xftLevel.dec === 0}
                trueContent={
                  <strong>
                    Learn more on our <Link to='/game/yoloxft'>XFT Page</Link>
                  </strong>
                }
                falseContent={
                  <strong>{`You are at a Level ${
                    xftLevel.dec
                  }  NFT, so only ${roundCountLeft?.toNumber()} bids and ${currencyFormatter(
                    cumulativeAmountLeft?.toString()
                  )} more are needed to level-up`}</strong>
                }
              />
            </NftDescription>
          </NftDetailsWrap>
        </NftRow>
        <NftRow bkground={nftProps.background10}>
          <Empty />
          <Feature>
            <Title>Total bids needed</Title>
            <Value> +{roundCountLeft.toNumber()} </Value>
          </Feature>
          <Feature>
            <Title>Total bids amount needed</Title>
            <Value>
              {cumulativeAmountLeft > 0 ? '+' : ''}
              {currencyFormatter(cumulativeAmountLeft.toString())}
            </Value>
          </Feature>
        </NftRow>
      </NftLevel>
      <BidderStatsWrapper bkground={nftProps.background10}>
        <Section>
          <Title>Your total bids</Title>
          <Value>
            <SingleDataLoader loading={isPending} data={counts?.allBids} />
          </Value>
        </Section>
        <Section>
          <Title>Your total bids amount</Title>
          <Value>
            <SingleDataLoader loading={isPending} data={amounts?.allAmount?.formatted} />
          </Value>
        </Section>
      </BidderStatsWrapper>
      <BottomLinks>
        <li>
          <DashboardLink to='/game/bidder-dashboard'>Dashboard</DashboardLink>
        </li>
      </BottomLinks>
    </StyledMenu>
  )
}

const StyledMenu = styled.div`
  position: relative;
  margin: 10px 0 0 0;
  padding: 20px 0;
  box-sizing: border-box;
  z-index: 4;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  list-style: none;
  color: rgba(255, 255, 255, 1);
  backdrop-filter: blur(40px);
  display: flex;
  flex-direction: column;
  cursor: default;
  justify-content: flex-start;
  min-width: 370px;
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: rgba(42, 109, 255, 0.2);
    box-shadow: 10px 30px 35px 0px rgb(0 0 0 / 35%);
    z-index: -1;
    border-radius: 10px;
    transform: translate(-50%, -50%);
  }
  ${({ theme }) => theme.breakPoints['425px']} {
    margin: 0;
    padding: 0 20px;
    width: 100%;
  }

  @-moz-document url-prefix() {
    background: rgba(255, 255, 255, 1) url(${images.FireFoxMenuBg}) center center / cover no-repeat;
  }
  .window_reset_password {
    cursor: pointer;
    padding: 15px 20px 0 20px;
    text-decoration: underline;
    :hover {
      text-decoration: none;
    }
  }
`
const UserForm = styled(UserIdForm)`
  flex-direction: row;
  white-space: nowrap;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  display: flex;
`
const NftLevel = styled.div`
  padding: 10px 0;
  margin: 20px 0 10px 0;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.2);
  padding-bottom: 0;
`
const NftRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  padding-bottom: 8px;
  :first-child {
    min-height: 100px;
  }
  &:last-child {
    padding: 0 0 8px 0;
    background: ${({ theme, bkground }) => theme.utils.addOpacityToHexColor(bkground, 50) || ''};
  }
`
const IconNft = styled(IconLib).attrs({
  dimension: '58px'
})`
  background-position: left center;
  background-size: auto 52px;
  background-repeat: no-repeat;
`
const NftDetailsWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 0 0 10px;
  width: calc(100% - 42px);
  border-bottom: 0;
`
const NftTitle = styled.div`
  display: flex;
  font-size: 1rem;
  font-weight: 700;
  line-height: 140%;
`
const NftDescription = styled.div`
  display: flex;
  font-size: 0.7rem;
  opacity: 0.6;
  padding: 6px 0 6px 0;
`
const Empty = styled.div`
  display: flex;
  width: 0;
`
const Feature = styled.div`
  flex-direction: column;
  align-items: center;
  padding: 8px 0 0 0;
  font-size: 0.8rem;
  width: 50%;
`
const Title = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 600;
`
const Value = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 20px;
  line-height: 140%;
  font-weight: 700;
  font-size: 1.1rem;
`
const BidderStatsWrapper = styled.div`
  width: 100%;
  flex-direction: row;
  display: flex;
`
const Section = styled.div`
  display: flex;
  border-right: 1px solid rgba(255, 255, 255, 0.5);
  flex-direction: column;
  align-items: center;
  width: 50%;
  font-size: 0.8rem;
  :last-child {
    border: none;
  }
  ${Title} {
    font-weight: 400;
  }
  ${Value} {
    font-weight: 700;
    font-size: 0.9rem;
  }
`
const BottomLinks = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 10px 0 10px;
  list-style: none;
  flex-direction: column;
  text-align: center;
  & li {
    text-align: center;
    justify-content: center;
    display: flex;
  }
`
const DashboardLink = styled(Link)`
  outline: none;
  border: none;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  padding: 8px 14px;
  line-height: 100%;
  margin: 10px 0 0 0;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 1px 30px 0px rgb(0 0 0 / 20%);
  color: #fff !important;
  background: #1d4baf;
  :hover {
    background: #2a6dff;
  }
`
