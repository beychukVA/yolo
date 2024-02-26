import React from 'react'

import { WalletSelectorModal } from './WalletSelector.Modal'
import { ApprovalModal } from './Approval.Modal'
import { InstallMetamaskModal } from './InstallMetamask.Modal'
import { IncompatibleBrowserModal } from './IncompatibleBrowser.Modal'
import { ChangeNetworkModal } from './ChangeNetwork.Modal'
import { BlockchainErrorModal } from './BlockchainError.Modal'
import { BiddingModal } from './Bidding.Modal'
import { ContestModal } from './Contest.Modal'
import { TokenDepositModal } from './TokenDeposit.Modal'
import { TokenWithdrawModal } from './TokenWithdraw.Modal'
import { StakeModal } from './Stake.Modal'
import { UnstakeModal } from './Unstake.Modal'
import { HarvestModal } from './Harvest.Modal'
import { XftClaimModal } from './XftClaim.Modal'
import { ProxyWalletWithdrawModal } from './ProxyWalletWithdraw.Modal'
import { G3minBidResultModal } from './BidResult.Modal/G3minBidResult.Modal'
import { G24hrBidResultModal } from './BidResult.Modal/G24hrBidResult.Modal'
import { New24hrGamesModal } from './New24hrGames.Modal'
import { SendInviteModal } from 'components/pages/gamesV3/Gameplay/Landing/Announcements/Modal/SendInvite.Modal'
import { JoinTheWaitlistModal } from 'components/pages/gamesV3/Gameplay/Landing/Announcements/Modal/JoinTheWaitlist.Modal'
import { SuccessfulAdditionToWaitlistModal } from 'components/pages/gamesV3/Gameplay/Landing/Announcements/Modal/SuccessfulAdditionToWaitlist.Modal'
import { UserAccountModal } from 'components/pages/gamesV3/Profile/Modal/UserAccount.Modal'
import { OrderModal } from './Order.Modal'
import { OrderTwitterCard } from './OrderTwitterCard.Modal'
import { OrderUpdateModal } from './OrderUpdate.Modal'
import { RoiCalculatorModal } from 'components/pages/gamesV3/Gameplay/InfiniteWinning/InfiniteLeaderboard/Modal/RoiCalculator.Modal'
import { AssetInfoModal } from 'components/pages/gamesV3/InfiniteWinningCard/Modal/AssetInfo.Modal'

const MODAL_DICT = {
  walletSelector: <WalletSelectorModal />,
  approvalERC20: <ApprovalModal />,
  bid3minResult: <G3minBidResultModal />,
  bid24hrResult: <G24hrBidResultModal />,
  installMetamask: <InstallMetamaskModal />,
  incompatibleMetamask: <IncompatibleBrowserModal />,
  changeNetwork: <ChangeNetworkModal />,
  blockchainError: <BlockchainErrorModal />,
  bidding: <BiddingModal />,
  contest: <ContestModal />,
  tokenDeposit: <TokenDepositModal />,
  tokenWithdraw: <TokenWithdrawModal />,
  stake: <StakeModal />,
  unstake: <UnstakeModal />,
  harvest: <HarvestModal />,
  xftClaim: <XftClaimModal />,
  proxyWalletWithdraw: <ProxyWalletWithdrawModal />,
  new24hrGames: <New24hrGamesModal />,
  sendInvite: <SendInviteModal />,
  joinTheWaitlist: <JoinTheWaitlistModal />,
  successAdditionToWaitlist: <SuccessfulAdditionToWaitlistModal />,
  roiCalculator: <RoiCalculatorModal />,
  userAccount: <UserAccountModal />,
  order: <OrderModal />,
  orderTwitterCard: <OrderTwitterCard />,
  updateOrder: <OrderUpdateModal />,
  assetInfo: <AssetInfoModal />
}

export const ModalLib = ({ modalId, ...modalProps }) => {
  const selectedModal = MODAL_DICT[modalId] || null
  const composedModal = selectedModal && React.cloneElement(selectedModal, { ...modalProps })

  return composedModal
}
