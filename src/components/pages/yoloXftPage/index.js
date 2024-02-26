import { ContestLayout } from 'components/Layouts/Contest.layout'
import { Wrapper } from './cssStyledWrapper'
import ms from 'ms.macro'

import { icons, images } from 'common'
import { useCallback, useLayoutEffect, useState } from 'react'
import styled from 'styled-components'
import { scrollToId } from 'utils'
import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { useXftEligible } from 'hooks/xftCampaign/useXftEligible'
import { ASYNC_STATUS_ID } from 'constants/index'
import { useXftProgress } from 'hooks/xftCampaign/useXftProgress'
import { Link } from 'components/Atoms/Link'
import { useWalletConnection } from 'hooks/useWalletConnection'
import { useUser } from 'hooks/user/useUser'
import { useYoloModal } from 'lib/yoloModals/useYoloModal'

const START_INIT = new Date('6/7/2022').getTime()
const DURATION = ms`30d`

export const YoloXftPage = () => {
  const { connectWallet } = useWalletConnection()
  const { account } = useUser('wallet')
  const { updateModal } = useYoloModal()
  const [, setDeadLineMs] = useState(START_INIT)
  const [campaignStatus, setCampaignStatus] = useState('progress')
  const [mintStatus, setMintStatus] = useState('ineligible')

  const { xftState, hasXftStatus } = useXftEligible()
  const { nftId } = useXftProgress()
  const { isAllowed } = useUser('allowed')

  useLayoutEffect(() => {
    if (!isAllowed) {
      setMintStatus('restricted')
      return
    }
    if (!account) {
      setMintStatus('notConnected')
      return
    }
    if (hasXftStatus(ASYNC_STATUS_ID.IDLE) && nftId) {
      if (!nftId.isZero()) {
        setMintStatus('minted')
      } else if (xftState.isEligible) {
        setMintStatus('eligible')
      } else {
        setMintStatus('ineligible')
      }
    }
  }, [hasXftStatus, nftId, xftState.isEligible, account, isAllowed])

  useLayoutEffect(() => {
    const currentTimeMs = Date.now()
    if (currentTimeMs >= START_INIT) {
      setCampaignStatus('progress')
      setDeadLineMs(START_INIT + DURATION)
    }
  }, [])

  const onMintClick = useCallback(
    (event) => {
      event.preventDefault()
      if (!account) {
        connectWallet()
        return
      }
      updateModal({
        id: 'xftClaim',
        show: true,
        backdropClose: false
      })
    },
    [account, connectWallet]
  )

  return (
    <ContestLayout>
      <Wrapper>
        <div id='xft-page'>
          <div id='page_wrapper'>
            <div id='main'>
              <div className='content'>
                <header>
                  <div className='yolorekt_logo_stacked_fff'>
                    <img alt='' src={icons.YoloXftLogo} />
                  </div>
                </header>
                <div className='what_is_xft' onClick={() => scrollToId('more-info')}>
                  What's an XFT? <a href='#'>Find out below</a> ↓
                </div>

                <div className='headline'>We have launched on a brand new XFT minting campaign</div>

                <div className='textblock'>
                  <p>
                    We have some exciting news for our existing YOLO and whitelisted users. Yolorekt has launched a
                    minted XFT campaign that will continuously run continuously and every user will get an equal chance
                    to mint YOLO XFTs until supply runs out.
                  </p>
                </div>
                <ContentSwitcherByState
                  noWrapper
                  activeState={campaignStatus}
                  stateObject={{
                    before: (
                      <div className='dateblock'>
                        <strong>June 10th, 2022</strong>
                        <p>The first campaign will go live at 9AM PST</p>
                        <p>More details will be announced at some point before launch</p>
                      </div>
                    ),
                    progress: (
                      <div className='ctablock'>
                        <ContentSwitcherByState
                          activeState={mintStatus}
                          stateObject={{
                            restricted: (
                              <form className='ineligible'>
                                <button id='xftMint-restricted' className='mint' disabled>
                                  Mint XFT
                                </button>
                                <div className='mint_status'>
                                  RESTRICTED <br />
                                  <WhyLink to='/restricted'>More info</WhyLink>
                                </div>
                              </form>
                            ),
                            notConnected: (
                              <form className='ready'>
                                <button id='xftMint-notConnected' className='mint' onClick={onMintClick}>
                                  Mint XFT
                                </button>
                              </form>
                            ),
                            eligible: (
                              <form className='ready'>
                                <button id='xftMint-eligible' className='mint' onClick={onMintClick}>
                                  Mint XFT
                                </button>
                                <div className='mint_status'>You are eligible to mint!</div>
                              </form>
                            ),
                            ineligible: (
                              <form className='ineligible'>
                                <button id='xftMint-ineligible' className='mint' disabled>
                                  Mint XFT
                                </button>
                                <div className='mint_status'>Not yet eligible to mint</div>
                              </form>
                            ),
                            minted: (
                              <form className='minted'>
                                <button id='xftMint-minted' className='mint' disabled>
                                  Mint XFT
                                </button>
                                <div className='mint_status'>YOU'RE MINTED!</div>
                              </form>
                            )
                          }}
                        />
                      </div>
                    ),
                    end: (
                      <div className='ctablock'>
                        <strong>Mint Campaign is ended</strong>
                      </div>
                    )
                  }}
                />

                <div className='plusdetails'>
                  <h1 className='hiw'>How it works</h1>
                  <div className='pg_steps'>
                    <div className='pg_steps_numbers'>
                      <span>1</span>
                      <span>2</span>
                    </div>
                    <img alt='' src={images.ProjectGalaxySteps} />
                  </div>

                  <div className='comp_links'>
                    <a
                      className='e-widget no-button generic-loader'
                      href='https://gleam.io/apiDl/yolorekt-gleam-contest'
                      target='blank'
                      rel='noopener noreferrer nofollow'
                    >
                      Link to GLEAM Competition
                    </a>
                  </div>
                  <p>
                    Anybody with a decentralized wallet can participate in the campaign. Simply connect the wallet to
                    the MATIC network and complete the approval process. Once setup has completed, users can claim their
                    YOLO XFT at the Yolorekt website for minting.
                  </p>
                  <p>
                    <strong>The minting price is $10 USDC (Polygon)</strong>
                  </p>
                </div>
                <div id='more-info' className='textblock details'>
                  <a id='whatisxft'></a>
                  <h2>What's a YOLO XFT?</h2>
                  <p>
                    The X-Fungible Token, born directly from the YOLOrekt crypto sweatshop, is a new form of an
                    expandable and upgradable non-fungible token designed to add new capabilities and functionalities to
                    an existing token.
                  </p>
                  <p>
                    Unlike the NFT, YOLO XFTs are unique beasts. They are primarily designed and built for tracking your
                    bid statistics on YOLOrekt. We think the YOLO XFT will be transformative, evolving to the demands of
                    more adaptability and upgradability in the NFT ecosystem.
                  </p>
                  <a href='https://docs.yolorekt.finance'>Learn more about YOLO XFTs on our Docs</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </ContestLayout>
  )
}

const WhyLink = styled(Link)`
  cursor: pointer;
  text-decoration: underline;
  color: #de0e54 !important;
`
