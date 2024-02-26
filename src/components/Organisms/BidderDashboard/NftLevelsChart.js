import React, { useCallback, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

import { XFT_LEVELS } from 'constants/xftLevels'
import { IconLib } from 'components/Atoms/IconLib'
import { currencyFormatter } from 'utils'
import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'
import { useWindowSize } from 'utils/hooks'
import { LONG_DASH } from 'constants/index'
import { useToken } from 'utils/hooks/useToken'

const YOUR_REWARDS = 235

const BREAK_POINTS = { '980px': 980 }

export const NftLevelsChart = ({ nftProgressData }) => {
  const { tokenId } = useToken()
  const { width } = useWindowSize()
  const [isMobile, setIsMobile] = useState(false)
  const { xftLevel } = nftProgressData
  const xftLevelId = xftLevel.dec

  const nftIdsArray = Object.keys(XFT_LEVELS)
  nftIdsArray.shift()

  const isCurrent = useCallback((id) => xftLevelId === +id, [xftLevelId])
  const nftProps = useCallback((id) => XFT_LEVELS[id] || XFT_LEVELS[0], [])

  const getFeesAndRewards = useCallback((id) => {
    return { rewards: YOUR_REWARDS * id }
  }, [])

  // Width responsiveness
  useEffect(() => {
    if (width < BREAK_POINTS['980px']) {
      setIsMobile(true)
    }
    if (width > BREAK_POINTS['980px']) {
      setIsMobile(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

  return (
    <Container id='nftLevelsChart'>
      <HeaderTitle>XFT Levels</HeaderTitle>
      <HeaderTotalBidsNeeded>Total bids needed</HeaderTotalBidsNeeded>
      <HeaderTotalBidsAmountNeeded>Total bids amount needed</HeaderTotalBidsAmountNeeded>
      <HeaderYoloRewards>{tokenId} rewards</HeaderYoloRewards>
      {/* <EarnTitle>Earn more {tokenId} rewards by leveling-up</EarnTitle> */}

      {nftIdsArray.map((id, idx) => {
        const { rewards } = getFeesAndRewards(id)
        return (
          <React.Fragment key={idx}>
            <LevelTitle gArea={`level_${id}_title`} level={id} isCurrent={isCurrent(id)}>
              <CurrentLevel level={id} isMobile={isMobile} isHidden={!isCurrent(id)}>
                Current level
              </CurrentLevel>
              {`Level ${nftProps(id).id}`}
            </LevelTitle>
            <LevelIcon gArea={`level_${id}_icon`} isCurrent={isCurrent(id)}>
              <CurrentLevel level={id} isMobile={!isMobile} isHidden={!isCurrent(id)}>
                Current level
              </CurrentLevel>
              <IconNft {...nftProps(id).iconProps}></IconNft>
            </LevelIcon>
            <LevelDescription gArea={`level_${id}_description`} level={id}>
              <LevelStatusMobile level={id}>{`Level ${id}`}</LevelStatusMobile>
              {nftProps(id).key}
            </LevelDescription>
            <LevelValue gArea={`level_${id}_value-1`}>{nftProps(id).neededBids}</LevelValue>
            <LevelValue gArea={`level_${id}_value-2`}>
              {isNaN(Number(nftProps(id).neededAmount)) ? LONG_DASH : currencyFormatter(nftProps(id).neededAmount)}
            </LevelValue>
            <LevelValue gArea={`level_${id}_value-4`} isCurrent={isCurrent(id)}>
              {nftProps(id).yoloRewards}
            </LevelValue>
            {/* {id > 1 && (
              <LevelValueBackground
                gArea={`level_${id}_${isCurrent(id) && isMobile ? 'current' : 'value-6'}`}
                isCurrent={isCurrent(id)}
                level={id}
                currentId={xftLevelId}
              >
                <SingleContentToggle toggle={isCurrent(id)} trueContent='Your rewards are' falseContent='' />

                <strong>{`${currencyFormatter(rewards, {
                  decimalDigits: 0,
                  noCurrencySign: true
                })} ${tokenId}`}</strong>
              </LevelValueBackground>
            )} */}
            {isCurrent(id) && id < 6 && (
              <YourRewardsCouldBeTitle gArea={`level_${id}_rewards_title`}>
                Your rewards could be
              </YourRewardsCouldBeTitle>
            )}
          </React.Fragment>
        )
      })}
    </Container>
  )
}

const Cell = styled.div`
  padding: 4px 8px;
  align-items: center;
  position: relative;
  margin-bottom: 6px;

  & strong {
    font-weight: 600;
    font-size: 1rem;
  }

  ${({ theme }) => theme.breakPoints['980px']} {
    padding: 10px 4px;
    & strong {
      font-size: 0.8rem;
    }
  }
`
const Header = styled.div`
  padding: 10px 10px 0 10px;
  justify-content: center;
  align-items: flex-end;
  font-size: 0.8rem;

  ${({ theme }) => theme.breakPoints['980px']} {
    padding: 0 5px 0 5px;
    font-size: 0.65rem;
    line-height: 110%;
  }
`
const center = css`
  text-align: center;
  justify-content: center;
`
const topLeftCorner = css`
  border-top-left-radius: 15px;
`
const topRightCorner = css`
  border-top-right-radius: 15px;
`
const bottomLeftCorner = css`
  border-bottom-left-radius: 15px;
`
const bottomRightCorner = css`
  border-bottom-right-radius: 15px;
`
const right = css`
  justify-content: flex-end;
  text-align: right;
`
const bgDef = css`
  background: rgba(129, 170, 255, 0.1);
`
const borderLeft = css`
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 99;
`
const vertBottom = css`
  align-items: flex-end;
  margin: 30px 0 6px 0;
`
const LevelTitle = styled(Cell)`
  grid-area: ${({ gArea }) => gArea};
  ${right}
  ${bgDef}
  font-weight: 300;
  white-space: nowrap;
  padding: ${({ isCurrent }) => (isCurrent ? '25px 0' : '13px 0')};
  padding-left: 20px !important;
  color: ${({ level }) => XFT_LEVELS[level].color};
  ${({ gArea }) => gArea === 'level_1_title' && topLeftCorner}
  ${({ gArea }) => gArea === 'level_6_title' && bottomLeftCorner}
  ${({ theme }) => theme.breakPoints['980px']} {
    display: none !important;
  }
`
const LevelIcon = styled(Cell)`
  grid-area: ${({ gArea }) => gArea};
  ${bgDef}

  ${({ theme }) => theme.breakPoints['980px']} {
    ${({ gArea }) => gArea === 'level_1_icon' && topLeftCorner}
    ${({ gArea, isCurrent }) => gArea === 'level_6_icon' && !isCurrent && bottomLeftCorner}
  }
`
const LevelDescription = styled(Cell)`
  grid-area: ${({ gArea }) => gArea};
  ${bgDef}
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: capitalize;

  color: ${({ level }) => XFT_LEVELS[level].color};

  ${({ theme }) => theme.breakPoints['980px']} {
    text-align: left;
    font-size: 0.8rem;
    padding-left: 0 !important;
    align-items: flex-start !important;
    justify-content: center;
    flex-direction: column;
    line-height: 110%;
  }
`
const LevelValue = styled(Cell)`
  grid-area: ${({ gArea }) => gArea};
  ${bgDef}
  ${center}
  ${borderLeft}
  ${({ gArea }) => gArea === 'level_1_value-4' && topRightCorner}
  
  ${({ theme }) => theme.breakPoints['980px']} {
    ${({ gArea, isCurrent }) => gArea === 'level_6_value-4' && !isCurrent && bottomRightCorner};
  }
`
const LevelValueBackground = styled(Cell)`
  grid-area: ${({ gArea }) => gArea};
  ${center}
  ${borderLeft}
  flex-direction: column;
  background: ${({ level }) => XFT_LEVELS[level].background01};
  ${({ gArea }) => gArea === 'level_2_value-6' && topRightCorner};
  ${({ gArea }) => gArea === 'level_6_value-6' && bottomRightCorner};

  ${({ theme }) => theme.breakPoints['980px']} {
    border-left: none;
    ${({ gArea }) => gArea === 'level_2_value-6' && [topLeftCorner, topRightCorner]};
    ${({ gArea, level, currentId }) => gArea.includes('_value-6') && +level < currentId && 'display: none !important;'};
    ${({ gArea, level, currentId }) =>
      gArea.includes('_value-6') && +level === currentId + 1 && [topLeftCorner, topRightCorner]};

    :last-child {
      ${({ gArea }) => gArea.includes('_value-6') && [bottomLeftCorner, bottomRightCorner]};
      ${({ gArea }) => gArea.includes('_current') && [bottomLeftCorner, bottomRightCorner]};
    }
  }

  strong {
    color: ${({ level }) => XFT_LEVELS[level].color};
  }
`
const Container = styled.div`
  & * {
    display: flex;
  }

  display: grid;
  width: 100%;
  margin: 60px 0 30px 0;
  position: relative;
  font-size: 0.9rem;
  grid-template-columns: 0.5fr 0.25fr 1fr 0.75fr 1fr 1fr; //1.5fr;
  grid-template-rows: 1fr;
  grid-auto-rows: auto;
  grid-auto-flow: row;
  grid-template-areas: 'header-title  header-title header-title        header-total_bids_needed header-total_bids_amount_needed   header-yolo_rewards ' //     header-right_double'
    'level_1_title level_1_icon level_1_description level_1_value-1          level_1_value-2                   level_1_value-4     ' //     earn_title'
    '.             .            .                   .                        .                                 .                   ' //     level_1_rewards_title'
    'level_2_title level_2_icon level_2_description level_2_value-1          level_2_value-2                   level_2_value-4     ' //     level_2_value-6'
    '.             .            .                   .                        .                                 .                   ' //     level_2_rewards_title'
    'level_3_title level_3_icon level_3_description level_3_value-1          level_3_value-2                   level_3_value-4     ' //     level_3_value-6'
    '.             .            .                   .                        .                                 .                   ' //     level_3_rewards_title'
    'level_4_title level_4_icon level_4_description level_4_value-1          level_4_value-2                   level_4_value-4     ' //     level_4_value-6'
    '.             .            .                   .                        .                                 .                   ' //     level_4_rewards_title'
    'level_5_title level_5_icon level_5_description level_5_value-1          level_5_value-2                   level_5_value-4     ' //     level_5_value-6'
    '.             .            .                   .                        .                                 .                   ' //     level_5_rewards_title'
    'level_6_title level_6_icon level_6_description level_6_value-1          level_6_value-2                   level_6_value-4     '; //     level_6_value-6';

  ${({ theme }) => theme.breakPoints['980px']} {
    display: grid;
    margin: 60px 0 30px 0;
    position: relative;
    font-size: 0.8rem;
    width: calc(100% + 4px);
    grid-template-columns: 0.25fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-auto-rows: auto;
    grid-auto-flow: row;
    grid-template-areas:
      'header-title              header-title              header-total_bids_needed  header-total_bids_amount_needed  header-yolo_rewards'
      'level_1_icon              level_1_description       level_1_value-1           level_1_value-2                  level_1_value-4'
      'level_2_icon              level_2_description       level_2_value-1           level_2_value-2                  level_2_value-4'
      'level_2_current           level_2_current           level_2_current           level_2_current                  level_2_current'
      'level_3_icon              level_3_description       level_3_value-1           level_3_value-2                  level_3_value-4'
      'level_3_current           level_3_current           level_3_current           level_3_current                  level_3_current'
      'level_4_icon              level_4_description       level_4_value-1           level_4_value-2                  level_4_value-4'
      'level_4_current           level_4_current           level_4_current           level_4_current                  level_4_current'
      'level_5_icon              level_5_description       level_5_value-1           level_5_value-2                  level_5_value-4'
      'level_5_current           level_5_current           level_5_current           level_5_current                  level_5_current'
      'level_6_icon              level_6_description       level_6_value-1           level_6_value-2                  level_6_value-4'
      'level_6_current           level_6_current           level_6_current           level_6_current                  level_6_current'
      'earn_title                earn_title                earn_title                earn_title                       earn_title'
      'level_1_rewards_title     level_1_rewards_title     level_1_rewards_title     level_1_rewards_title            level_1_rewards_title'
      'level_2_value-6           level_2_value-6           level_2_value-6           level_2_value-6                  level_2_value-6'
      'level_2_rewards_title     level_2_rewards_title     level_2_rewards_title     level_2_rewards_title            level_2_rewards_title'
      'level_3_value-6           level_3_value-6           level_3_value-6           level_3_value-6                  level_3_value-6'
      'level_3_rewards_title     level_3_rewards_title     level_3_rewards_title     level_3_rewards_title            level_3_rewards_title'
      'level_4_value-6           level_4_value-6           level_4_value-6           level_4_value-6                  level_4_value-6'
      'level_4_rewards_title     level_4_rewards_title     level_4_rewards_title     level_4_rewards_title            level_4_rewards_title'
      'level_5_value-6           level_5_value-6           level_5_value-6           level_5_value-6                  level_5_value-6'
      'level_5_rewards_title     level_5_rewards_title     level_5_rewards_title     level_5_rewards_title            level_5_rewards_title'
      'level_6_value-6           level_6_value-6           level_6_value-6           level_6_value-6                  level_6_value-6';
  }
`
const HeaderTitle = styled.div`
  grid-area: header-title;
  align-items: flex-end;
  padding: 0 0 8px 0;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  text-align: left;
`
const HeaderTotalBidsNeeded = styled(Header)`
  grid-area: header-total_bids_needed;
  text-align: center;
  padding: 0 0 8px 0;
`
const HeaderTotalBidsAmountNeeded = styled(Header)`
  grid-area: header-total_bids_amount_needed;
  text-align: center;
  padding: 0 0 8px 0;
`
const HeaderYoloRewards = styled(Header)`
  grid-area: header-yolo_rewards;
  text-align: center;
  padding: 0 0 8px 0;
`
const EarnTitle = styled(Cell)`
  ${center}
  grid-area: earn_title;
  font-size: 1rem;
  font-weight: 700;
  padding-left: 30px !important;
  padding-right: 30px !important;

  ${({ theme }) => theme.breakPoints['980px']} {
    font-size: 0.9rem;
    padding-left: 10px !important;
    padding-right: 10px !important;
  }
`
const CurrentLevel = styled.div`
  position: absolute;
  left: 0;
  top: -10px;
  border-radius: 10px;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
  text-transform: uppercase;
  font-size: 0.65rem;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  padding: 7px 12px 5px 12px;
  line-height: 100%;
  z-index: 1;
  color: white;

  background: ${({ level }) => XFT_LEVELS[level].background10};
  ${({ isHidden }) => isHidden && 'display: none;'}
  ${({ isMobile }) => isMobile && 'display: none;'}
  
  ${({ theme }) => theme.breakPoints['980px']} {
    position: absolute;
    left: 0;
    top: -7px;
    border-radius: 10px;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
    text-transform: uppercase;
    font-size: 0.6rem;
    font-weight: 700;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    padding: 5px 12px 5px 12px;
    line-height: 100%;
    z-index: 9999;
    display: flex;
    ${({ isHidden }) => isHidden && 'display: none;'}/* ${({ isMobile }) => isMobile && 'display: none;'} */
  }
`
const IconNft = styled(IconLib).attrs({
  collection: 'yolorekt',
  dimension: '26px'
})`
  background-size: 26px 26px;
  width: 26px;
  height: 26px;

  ${({ theme }) => theme.breakPoints['980px']} {
    position: relative;
  }
`
const LevelStatusMobile = styled.div`
  display: none;
  color: ${({ level }) => XFT_LEVELS[level].color};
  ${({ theme }) => theme.breakPoints['980px']} {
    display: flex;
    font-size: 0.65rem;
    font-weight: 300;
  }
`
const YourRewardsCouldBeTitle = styled(Cell)`
  grid-area: ${({ gArea }) => gArea};
  ${center}
  ${vertBottom}
  ${({ theme }) => theme.breakPoints['980px']} {
    margin: 0;
  }
`
