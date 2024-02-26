import React, { useMemo } from 'react'
import styled from 'styled-components'
import { icons } from 'common'
import { useXftProgress } from 'hooks/xftCampaign/useXftProgress'
import { XFT_LEVELS } from 'constants/xftLevels'
import { useBidderData } from 'datasource/biddersDashboard'
import { ASYNC_STATUS_ID } from 'constants/index'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { IconLib } from 'components/Atoms/IconLib'
import { currencyFormatter } from 'utils'
import { hexToRGBA } from 'react-stockcharts/lib/utils'
import { useUser } from 'hooks/user/useUser'

export const UserAccountModal = ({ closeModal }) => {
  const { xftLevel, roundCountLeft, cumulativeAmountLeft } = useXftProgress()
  const nftProps = useMemo(() => XFT_LEVELS[xftLevel.dec], [xftLevel.dec])
  const { data: bidderData, hasStatus } = useBidderData()
  const { counts, amounts } = bidderData || {}
  const isPending = hasStatus(ASYNC_STATUS_ID.PENDING)
  const { username, avatar } = useUser('profile')

  const percent =
    (xftLevel.dec / 100) *
    6 *
    100 *
    (xftLevel.dec <= 4 ? xftLevel.dec / 1.4 : xftLevel.dec === 6 ? 2.7 : xftLevel.dec / 1.9)

  return (
    <ModalOverlay onClick={() => closeModal()}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseWindowIcon onClick={() => closeModal()} />
        <Header>
          <ProfileWrapper>
            <ProfileAvatar className='profileAvatar' avatar={avatar} />
            <ProfileName className='profileName'>
              {username || 'TinoN2264'}
              <ProfileDescription>Straight Baller</ProfileDescription>
            </ProfileName>
            <EditProfile>Edit profile</EditProfile>
          </ProfileWrapper>
        </Header>
        <Body>
          <FlexRow>
            <Content>
              <GridContent>
                <RowTitle>Total Bids</RowTitle>
                <RowValue>
                  <SingleDataLoader loading={isPending} data={counts?.allBids} />
                </RowValue>

                <RowTitle>Total amount bid</RowTitle>
                <RowValue>
                  <SingleDataLoader loading={isPending} data={amounts?.allAmount?.formatted} />
                </RowValue>

                <RowTitle>Most played game</RowTitle>
                <RowValue>FUTURE$</RowValue>

                <RowTitle>Total won</RowTitle>
                <RowValue>
                  <SingleDataLoader loading={isPending} data={amounts?.winningAmount?.formatted} />
                </RowValue>

                <RowTitle>Total ROI</RowTitle>
                <RowValue>
                  <SingleDataLoader loading={isPending} data={amounts?.allRoi?.formatted || '0.00%'} />
                </RowValue>
              </GridContent>
            </Content>
            <Content>
              <Subtitle>SOCIAL</Subtitle>
              <SocialList>
                <SocialLink icon={icons.twitter_icon_blue}>Twitter</SocialLink>
                <SocialLink icon={icons.telegram_icon}>Telegram</SocialLink>
                <SocialLink icon={icons.discord_icon}>Discord</SocialLink>
              </SocialList>
            </Content>
          </FlexRow>
          <Content className='pt w-full'>
            <Subtitle className='xft-subtitle'>XFT Status</Subtitle>
            <UserInfoWrapper color={hexToRGBA(nftProps.color, 0.5)}>
              <UserNftWrapper>
                <NftLink href=''>
                  <NftIcon {...nftProps.iconProps}></NftIcon>
                </NftLink>
                <NftDetails>
                  <NftLevel color={nftProps.color}>{`${nftProps.caption}`}</NftLevel>
                  <NftStatus>
                    {roundCountLeft.toNumber()} bids & {currencyFormatter(cumulativeAmountLeft.toString())} needed to
                    level-up. &nbsp; <LearnMore href=''>Learn more</LearnMore>
                  </NftStatus>
                </NftDetails>
              </UserNftWrapper>
              <MultiNftProgressBar color={nftProps.color}>
                <LevelContainer percent={percent}>
                  <Level>Level {xftLevel.dec} / 6</Level>
                  <Line></Line>
                </LevelContainer>
                <LevelIndicator>
                  <LevelDetails>
                    <LevelDetailsItem>
                      <BidsValue>
                        {' '}
                        <SingleDataLoader loading={isPending} data={counts?.allBids} />{' '}
                      </BidsValue>
                      <BidsLabel> BIDS </BidsLabel>
                    </LevelDetailsItem>
                    <Separator>/</Separator>
                    <LevelDetailsItem>
                      <BidsValue>
                        {' '}
                        <SingleDataLoader loading={isPending} data={amounts?.allAmount?.formatted} />{' '}
                      </BidsValue>
                      <BidsLabel> TOTAL AMOUNT BID </BidsLabel>
                    </LevelDetailsItem>
                  </LevelDetails>
                </LevelIndicator>
              </MultiNftProgressBar>
            </UserInfoWrapper>
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
  max-width: 600px;
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

  .profileAvatar {
    height: 65px;
    width: 65px;
    border-radius: 15px;
  }

  .profileName {
    margin: 0 0 0 15px;
    font-weight: 600;
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
`
const Header = styled.div`
  z-index: 1;
  position: relative;
  top: 0;
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  background: hsla(214, 18%, 16%, 0.8);
  border-radius: 10px 10px 0 0;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
  line-height: 130%;
  padding: 30px 30px 20px 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Body = styled.div`
  max-height: 800px;
  height: fit-content;
  background-color: hsla(214, 18%, 16%, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 0 0 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  /* padding: 0 0 20px 0; */

  .pt {
    padding: 30px 0 0 0;
  }
  .xft-subtitle {
    margin: 0 0 14px 30px;
  }
  .w-full {
    width: 100%;
  }
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
  height: 100%;
  transition: width 300ms ease-in-out;
  width: 50%;
  padding: 30px;
  border-top: 0;
`
const EditProfile = styled.button`
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
  border-radius: 10px;
  height: fit-content;
  padding: 6px 18px;
  font-size: 0.7rem;
  margin-left: auto;
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
const ProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`
const ProfileDescription = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
  display: inline-flex;
  margin: 7px 0px 0px;
`
const ProfileName = styled.div`
  padding: 0 0 0 10px;
  line-height: 100%;
  font-size: 0.9rem;
  font-weight: 600;
`
const ProfileAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background-image: url(${({ avatar }) => avatar});
  background-repeat: no-repeat;
  background-size: contain;

  @media (max-width: 800px) {
    display: none;
  }
`
const GridContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`
const RowTitle = styled.label`
  padding: 0 0 20px 0;
  text-align: right;
  text-transform: uppercase;
  white-space: nowrap;
`
const RowValue = styled.label`
  padding: 0 0 20px 0;
  margin: 0 0 0 15px;
  font-weight: 700;
`
const Subtitle = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  margin: 0 0 14px 0;
`
const SocialList = styled.div``

const SocialLink = styled.a`
  color: #fff;
  text-decoration: none;
  text-decoration-color: rgba(255, 255, 255, 0.4);
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  border: 1px solid hsl(197, 6%, 33%);
  border-radius: 1.5em;
  padding: 10px 14px 11px 40px;
  margin: 0 0 5px 0;
  line-height: 100%;
  font-size: 0.8rem;
  display: block;
  background: url(${({ icon }) => icon}) 12px center / 20px auto no-repeat;
`
const FlexRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
  width: 100%;
  height: 100%;
`
const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* background: linear-gradient(180deg, rgba(32, 37, 47, 0) 0%, rgba(43, 44, 88, 1) 100%); */
  background: linear-gradient(180deg, rgba(32, 37, 47, 0) 0%, ${({ color }) => color} 300%);
  padding: 15px 30px 30px 30px;
  border-radius: 0 0 10px 10px;
  width: 100%;
  height: 100%;
`
const UserNftWrapper = styled.div`
  display: flex;
  padding: 0;
  width: 100%;
  justify-content: flex-start;
  position: relative;
`
const MultiNftProgressBar = styled.div`
  display: flex;
  background: linear-gradient(
    90deg,
    rgba(195, 195, 195, 1) 0%,
    rgba(82, 9, 211, 1) 20%,
    rgba(36, 240, 25, 1) 40%,
    rgba(239, 184, 15, 1) 60%,
    rgba(238, 0, 0, 1) 80%,
    rgba(0, 172, 239, 1) 100%
  );
  width: 100%;
  height: 30px;
  border-radius: 15px;
  margin: 50px 0 10px 0;
  position: relative;
  z-index: 0;

  &::before {
    position: absolute;
    top: -4px;
    left: -4px;
    width: calc(100% + 6px);
    height: 35px;
    border-radius: 20px;
    content: '';
    z-index: -1;
    border: 1px solid #6817f0;
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    border-radius: 15px;
    content: '';
    z-index: 1;
    background: rgba(0, 0, 0, 0.3);
  }
`
const NftLink = styled.a`
  color: #fff;
  text-decoration: none;
  text-decoration-color: rgba(255, 255, 255, 0.4);
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  display: flex;
`
const NftIcon = styled(IconLib).attrs({
  dimension: '58px'
})`
  -webkit-mask-size: 54px 54px;
  mask-size: 54px 54px;
  width: 54px;
  height: 54px;
  background-repeat: no-repeat;
  background-size: cover;
`
const NftDetails = styled.div`
  display: flex;
  flex-flow: column;
  padding: 0 0 0 15px;
  justify-content: center;
`
const NftLevel = styled.div`
  display: flex;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 3px 0 0 0;
  color: ${({ color }) => color};
`
const NftStatus = styled.div`
  font-weight: 300;
  font-size: 0.8rem;
  padding: 5px 0 10px 0;
  display: inline;
`
const LearnMore = styled.a`
  color: #fff;
  text-decoration: none;
  text-decoration-color: rgba(255, 255, 255, 0.4);
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  display: inline;
`
const LevelIndicator = styled.div`
  display: flex;
  position: absolute;
  top: -10px;
  height: 50px;
  z-index: 2;
  left: 22%;

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    border-radius: 15px;
    content: '';
    z-index: 1;
    background: rgba(0, 0, 0, 0.3);
  }
`
const Level = styled.label`
  display: flex;
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-weight: 500;
  font-size: 0.8rem;
`
const Line = styled.div`
  display: flex;
  background: #fff;
  height: 50px;
  width: 2px;
  z-index: 2;
`
const LevelDetails = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: calc(30% + 30px);
  white-space: nowrap;
`
const LevelDetailsItem = styled.div`
  display: flex;
  align-items: center;
`
const Separator = styled.div`
  display: flex;
  font-size: 1.5rem;
  font-weight: 200;
  padding-right: 10px;
`
const BidsValue = styled.div`
  display: flex;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  padding: 0 10px 0 0;
`
const BidsLabel = styled.div`
  display: flex;
  font-size: 0.75rem;
  text-transform: uppercase;
  padding: 0 10px 0 0;
`
const LevelContainer = styled.div`
  display: flex;
  position: absolute;
  top: -10px;
  left: ${({ percent }) => `${percent === 0 ? 2 : percent}%`};
`
