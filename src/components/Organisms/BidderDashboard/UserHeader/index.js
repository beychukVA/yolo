import { useMemo } from 'react'
import styled, { css } from 'styled-components'

import { IconLib } from 'components/Atoms/IconLib'

import { XFT_LEVELS } from 'constants/xftLevels'
import { ASYNC_STATUS_ID } from 'constants/index'
import { useYlpRewardBalance } from 'hooks/ylp/useYlpRewardBalance'
import { LevelIndicator } from './LevelIndicator'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { currencyFormatter, scrollToId } from 'utils'
import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'
import { useXftUpgrade } from 'hooks/xftCampaign/useXftUpgrade'
import { Link } from 'components/Atoms/Link'
import { BigNumber } from 'ethers'
import { useToken } from 'utils/hooks/useToken'
import { useConvertAmount } from 'utils/hooks'
import { config } from 'config'
import { useYoloModal } from 'lib/yoloModals/useYoloModal'

export const UserHeader = ({ nftProgressData }) => {
  const { tokenId, formatToken } = useToken()
  const convert = useConvertAmount()
  const { upgradeXFT } = useXftUpgrade()
  const { updateModal } = useYoloModal()

  const { xftLevel, roundCount, cumulativeBidAmount, canUpgrade, roundCountLeft, cumulativeAmountLeft } =
    nftProgressData

  const amountLeft = useMemo(() => {
    const tokenAmount = (BigNumber.isBigNumber(cumulativeAmountLeft) && formatToken(cumulativeAmountLeft)) || 0
    return convert(tokenAmount, tokenId, config.DEFAULT_FIAT)
  }, [cumulativeAmountLeft, convert, formatToken, tokenId])

  const roundsLeft = useMemo(
    () => (BigNumber.isBigNumber(roundCountLeft) && roundCountLeft.toString()) || 0,
    [roundCountLeft]
  )

  const { hasStatus: hasYlpRewardStatus, ylpRewardBalance } = useYlpRewardBalance({ silentUpdate: true })
  const hasYlpRewardStatusPending = hasYlpRewardStatus(ASYNC_STATUS_ID.PENDING)
  const canHarvest = useMemo(() => !!ylpRewardBalance, [ylpRewardBalance])

  const harvestModalObj = {
    show: true,
    id: 'harvest',
    backdropClose: false,
    backdropBlurred: false
  }
  const onHarvest = () => {
    updateModal(harvestModalObj)
  }

  const onUpgrade = () => {
    upgradeXFT()
  }

  const scrollTo = (domId) => {
    scrollToId(domId)
  }

  const nftProps = useMemo(() => XFT_LEVELS[xftLevel.dec], [xftLevel.dec])

  return (
    <Container id='user_info_wrap'>
      <Title>Your XFT status</Title>
      <UserInfoWrapper id='user_info_wrap' backgroundGrad={nftProps?.backgroundGrad}>
        <UserNftWrapper id='user_nft_wrapper'>
          <div className='user_nft_wrapper'>
            <div>
              <UserAvatar>
                <IconNft {...nftProps.iconProps}></IconNft>
              </UserAvatar>
              <div className='user_nft_details'>
                <NftLevelTitle
                  id='user_nft_level'
                  txtColor={nftProps.id > 0 ? nftProps.color : null}
                  maskingText={nftProps.maskingText}
                  maskingColor={nftProps.maskingColor}
                >
                  {nftProps.caption}
                </NftLevelTitle>
                <div className='user_nft_status'>
                  <ContentSwitcherByState
                    activeState={canUpgrade ? 'upgrade' : nftProps.id.toString()}
                    stateObject={{
                      0: `You're ready to get the Silver XFT!`,
                      6: `You are a bidding master, you're at the highest XFT level.   Learn more`,
                      upgrade: `You're ready to upgrade to the next level!`,
                      default: (
                        <>
                          {`${roundsLeft} bids & ${amountLeft} needed to level-up.`} &nbsp;
                          <Link onClick={() => scrollTo('nftLevelsChart')}>Learn More</Link>
                        </>
                      )
                    }}
                  />
                </div>
                <ContentSwitcherByState
                  activeState={canUpgrade ? 'upgrade' : nftProps.id.toString()}
                  stateObject={{
                    upgrade: (
                      <UpgradeButton id='upgrade_nft' bkground={nftProps.background10} onClick={onUpgrade}>
                        Upgrade now
                      </UpgradeButton>
                    ),
                    0: (
                      <UpgradeButton id='upgrade_nft' bkground={nftProps.background10} to='/game/yoloxft'>
                        Get this XFT now
                      </UpgradeButton>
                    ),
                    default: (
                      <UpgradeButton
                        id='upgrade_nft'
                        bkground={nftProps.background10}
                        onClick={() => scrollTo('cards_container')}
                      >
                        Get this XFT now
                      </UpgradeButton>
                    )
                  }}
                />
              </div>
            </div>
            <div className='rewards_unharvested'>
              <div className='title'>Total rewards unharvested</div>
              <div className='ru_inside_wrapper'>
                <UnharvestedValue id='unharvested_value' txtColor={nftProps.color} maskingText={nftProps.maskingText}>
                  <SingleDataLoader
                    loading={hasYlpRewardStatusPending}
                    data={currencyFormatter(ylpRewardBalance, {
                      noCurrencySign: true
                    })}
                  />
                  <HarvestButton
                    id='harvest_btn'
                    bkground={nftProps.background10}
                    // disabled={!canHarvest}
                    disabled={true}
                    onClick={onHarvest}
                  >
                    Harvest
                  </HarvestButton>
                </UnharvestedValue>
                <div id='countdown' className='callout'>
                  {/* <SingleContentToggle
                    toggle={!canHarvest}
                    trueContent={<NextRewardCountdown>Countdown to new rewards: (countdown)</NextRewardCountdown>}
                    falseContent={
                      <>
                        <AlertIcon />
                        Keep bidding to harvest rewards
                      </>
                    }
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </UserNftWrapper>
        <NftProgressBar id='multi_nft_progress_bar' borderColor={nftProps.color}>
          <LevelIndicator
            levelDec={nftProps.id}
            roundCountBn={roundCount}
            cumulativeBidAmountBn={cumulativeBidAmount}
          />
        </NftProgressBar>
      </UserInfoWrapper>
    </Container>
  )
}

const nftWrapperCss = css`
  /*! CSS Used from: http://yolo.tino.me/game-omega-staging/resources/css/dashboard.css */
  .user_nft_wrapper {
    display: flex;
    padding: 0 0 20px 0;
    width: 100%;
    justify-content: space-between;
    position: relative;
  }
  .user_nft_details {
    display: flex;
    flex-flow: column;
    padding: 0 0 0 15px;
    align-items: flex-start;
  }

  .user_nft_wrapper .user_nft_status {
    font-weight: 300;
    font-size: 0.9rem;
    padding: 0 0 10px 0;
    display: inline;
  }
  .user_avatar {
    flex-wrap: wrap;
  }
  .user_avatar .nft_icon {
    background-size: 96px 96px;
    -webkit-mask-size: 96px 96px;
    mask-size: 96px 96px;
    width: 96px;
    height: 96px;
  }

  .rewards_unharvested {
    display: flex;
    flex-flow: column;
    padding: 10px 0 0 0;
    align-items: flex-end;
  }
  .rewards_unharvested .title {
    font-size: 0.9rem;
    padding: 0 0 10px 0;
    line-height: 100%;
    font-weight: 600;
  }
  .rewards_unharvested .ru_inside_wrapper {
    flex-flow: column;
  }
  .rewards_unharvested #countdown {
    padding: 10px 0 0 0;
  }
  .rewards_unharvested #countdown.callout {
    color: #de0e54;
    padding: 10px 0 0 20px;
    font-size: 0.9rem;
  }
  button.harvest:hover {
    filter: brightness(1.2);
  }
  @media (max-width: 980px) {
    .user_nft_wrapper {
      flex-flow: column;
      align-items: flex-start;
    }
    .rewards_unharvested {
      align-items: flex-start;
      margin: 30px 0 0 0;
      padding: 30px 0 0 0;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      width: 100%;
    }
    .rewards_unharvested .title {
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .user_header_wrap.nonft .rewards_unharvested .value {
      padding: 0;
    }
    .rewards_unharvested #countdown {
      padding: 0 0 0 10px;
    }
    .rewards_unharvested .ru_inside_wrapper {
      flex-flow: row;
      align-items: center;
    }
  }
  @media (max-width: 480px) {
    .rewards_unharvested .ru_inside_wrapper {
      flex-flow: column;
    }
    .rewards_unharvested .ru_inside_wrapper #countdown {
      padding: 10px 0 0 0;
    }
  }
`
const textMaskingCss = css`
  background: ${({ maskingColor }) => maskingColor};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline;
`

const Container = styled.div`
  width: calc(100% + 120px);
  flex-direction: column;
  display: flex;
  padding: 10px 60px;
  margin: 0 -60px;
  position: relative;

  * {
    display: flex;
  }
`
const Title = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  min-height: 30px;
  text-transform: uppercase;
  display: flex;
`
const UserInfoWrapper = styled.div`
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  margin: 0 -60px 0 -60px;
  padding: 10px 60px 30px 60px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: ${({ backgroundGrad }) => backgroundGrad};
  ${({ theme }) => theme.breakPoints['600px']} {
    margin: 0 -30px 0 -30px;
    padding: 10px 30px 30px 30px;
  }
`

const UserNftWrapper = styled.div`
  ${nftWrapperCss}
`
const NftProgressBar = styled.div`
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
  height: 44px;
  border-radius: 15px;
  margin: 50px 0 10px 0;
  position: relative;
  z-index: 0;
  :before {
    position: absolute;
    top: -4px;
    left: -4px;
    width: calc(100% + 6px);
    height: 50px;
    border-radius: 20px;
    content: '';
    z-index: -1;
    border: 1px solid ${({ borderColor }) => borderColor};
  }
  :after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    border-radius: 15px;
    content: '';
    z-index: 1;
    background: rgba(0, 0, 0, 0.3);
  }
  ${({ theme }) => theme.breakPoints['980px']} {
    height: 64px;
    :before {
      height: 70px;
    }
    :after {
      height: 64px;
    }
  }
  ${({ theme }) => theme.breakPoints['480px']} {
    height: 24px;
    margin-bottom: 60px;
    :before {
      height: 30px;
    }
    :after {
      height: 24px;
    }
  }
`

const UserAvatar = styled.div`
  flex-wrap: wrap;
`
const IconNft = styled(IconLib)`
  background-size: 96px 96px;
  mask-size: 96px 96px;
  width: 96px;
  height: 96px;
`
const UpgradeButton = styled(Link)`
  padding: 10px 30px;
  line-height: 100%;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 10px;
  width: fit-content;
  background: ${({ bkground }) => bkground || ''};
  color: #ffff;
  text-decoration: none;
  :hover {
    filter: brightness(1.2);
    color: #ffff;
  }
  :disabled {
    cursor: not-allowed !important;
    opacity: 0.5;
  }
`
const HarvestButton = styled.button`
  padding: 6px 24px;
  border-radius: 10px;
  margin: 0 0 0 10px;
  font-size: 1rem;
  font-weight: 600;
  background: ${({ bkground }) => bkground || ''};
  color: #ffff;
  :hover {
    filter: brightness(1.2);
  }
  :disabled {
    cursor: not-allowed !important;
    opacity: 0.5;
  }
`
const AlertIcon = styled(IconLib).attrs(() => {
  return {
    collection: 'general',
    name: 'error',
    masking: true
  }
})`
  background: #de0e54;
  width: 20px;
  height: 20px;
  margin: 0 5px;
`
const UnharvestedValue = styled.div`
  flex-flow: row;
  display: flex;
  font-size: 1.8rem;
  letter-spacing: -0.04em;
  align-items: center;
  justify-content: flex-end;
  color: ${({ txtColor }) => txtColor || `#fff`};
`
const NftLevelTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  padding: 3px 0 0 0;
  color: ${({ txtColor }) => txtColor || `#fff`};
  ${({ maskingText }) => (maskingText ? textMaskingCss : null)}
`
const NextRewardCountdown = styled.div`
  color: white;
`
