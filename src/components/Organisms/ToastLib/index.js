import React from 'react'

import { GenericErrorToast } from './GenericError.toast'
import { ApprovalToast } from './Approval.toast'
import { LiveToast } from './Live.toast'
import { NftReadyToast } from './NftReady.toast'
import { NftClaimToast } from './NftClaim.toast'
import { NftClaimPendingToast } from './NftClaimPending.toast'
import { TokenPendingToast } from './TokenPending.toast'
import { TokenReadyToast } from './TokenReady.toast'
import { UsernamePendingToast } from './UsernamePending.toast'
import { UsernameReadyToast } from './UsernameReady.toast'
import { BidPlacedToast } from './BidPlaced.toast'
import { BidHashToast } from './BidHash.toast'
import { ReferralToast } from './Referral.toast'
import { TransakSuccessfulToast } from './TransakSuccessful.toast'
import { ResetPasswordCodeToast } from './ResetPasswordCode.toast'
import { ResetPasswordSucceedToast } from './ResetPasswordSucceed.toast'
import { GenericInfoToast } from './GenericInfoToast.toast'
import { SuccessToast } from './SuccessToast.toast'
import { ErrorToast } from './ErrorToast.toast'
import { WarningToast } from './WarningToast.toast'
import { InfoToast } from './InfoToast.toast'
import { AnnounceToast } from './AnnounceToast.toast'

const TOAST_DICT = {
  genericError: <GenericErrorToast />,
  approval: <ApprovalToast />,
  live: <LiveToast />,
  nftReady: <NftReadyToast />,
  nftClaim: <NftClaimToast />,
  nftClaimPending: <NftClaimPendingToast />,
  tokenPending: <TokenPendingToast />,
  tokenReady: <TokenReadyToast />,
  usernamePending: <UsernamePendingToast />,
  usernameReady: <UsernameReadyToast />,
  usernameError: <GenericErrorToast />,
  bidPlaced: <BidPlacedToast />,
  bidHash: <BidHashToast />,
  referral: <ReferralToast />,
  transakSuccessful: <TransakSuccessfulToast />,
  resetPasswordCode: <ResetPasswordCodeToast />,
  resetPasswordSucceed: <ResetPasswordSucceedToast />,
  genericInfo: <GenericInfoToast />,
  successToast: <SuccessToast />,
  errorToast: <ErrorToast />,
  warningToast: <WarningToast />,
  infoToast: <InfoToast />,
  announceToast: <AnnounceToast />
}

export const ToastLib = ({ toastId, ...toastProps }) => {
  const selectedToast = TOAST_DICT[toastId] || null
  const composedToast = selectedToast && React.cloneElement(selectedToast, { ...toastProps })

  return composedToast
}
