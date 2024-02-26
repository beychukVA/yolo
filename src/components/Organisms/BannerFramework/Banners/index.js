import React from 'react'

import { RestrictedBanner } from './Restricted.banner'
import { YoloXftBanner } from './YoloXft.banner'
import { BetaEndedBanner } from './BetaEnded.banner'
import { DocsLiveBanner } from './DocsLive.banner'
import { ImmunefiBanner } from './Immunefi.banner'
import { New24hrGamesBanner } from './New24hrGames.banner'
import { DoubleDepositBonusBanner } from './DoubleDepositBonus.banner'

const BANNER_DICT = {
  restricted: <RestrictedBanner />,
  yoloXft: <YoloXftBanner />,
  betaEnded: <BetaEndedBanner />,
  docsLive: <DocsLiveBanner />,
  immunefi: <ImmunefiBanner />,
  new24hrGames: <New24hrGamesBanner />,
  doubleDepositBonus: <DoubleDepositBonusBanner />
}

export const BannerLib = ({ bannerId, ...props }) => {
  const selectedBanner = BANNER_DICT[bannerId] || null
  const composedBanner = selectedBanner && React.cloneElement(selectedBanner, { ...props })

  return composedBanner
}
