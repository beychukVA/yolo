import { useConvertAmount } from 'utils/hooks'
import { useToken } from 'utils/hooks/useToken'
import { config } from 'config'
import { useCallback } from 'react'
import { Tooltip } from 'components/Atoms/Tooltip'
import { useUser } from 'hooks/user/useUser'

const { DEFAULT_FIAT } = config

export const WalletBalances = ({ setActiveTab }) => {
  const { tokenId, formatToken } = useToken()
  const { isProxy } = useUser('wallet')

  const convert = useConvertAmount()

  const { totalBalanceBN, yoloWalletAmountBN, tokenAmountBN, earningsBalanceBN } = useUser('balance')

  const convertFromTokenToUSD = useCallback(
    (amountBN) => convert(formatToken(amountBN), tokenId, DEFAULT_FIAT),
    [tokenId, convert, formatToken]
  )

  return (
    <div className='wallet_level_1'>
      <h4>BALANCES</h4>
      <div className='wallet_page_balance_wrapper'>
        <div className='wallet_page_balance'>
          {!isProxy && (
            <div className='sub_balance_wrapper'>
              <strong>
                <Tooltip infoIcon container={'Earnings balance'}>
                  Your USDC balance from your winning bids. Claim to use these funds for bidding or withdrawal.
                </Tooltip>
              </strong>
              <div className='earnings_balance_value'>{convertFromTokenToUSD(earningsBalanceBN)}</div>
              <button onClick={() => setActiveTab('withdraw')}>Claim</button>
            </div>
          )}

          <div className='sub_balance_wrapper'>
            <strong>
              <Tooltip infoIcon container={'App balance'}>
                Your USDC balance held within the users contract
              </Tooltip>
            </strong>
            <div className='earnings_balance_value'>{convertFromTokenToUSD(tokenAmountBN)}</div>
          </div>

          <div className='sub_balance_wrapper'>
            <strong>
              <Tooltip infoIcon container={`${isProxy ? 'pending' : 'wallet'} balance`}>
                {isProxy ? 'Your USDC pending to be added to app Balance' : 'Your USDC balance in the ERC20 contract'}
              </Tooltip>
            </strong>
            <div className='earnings_balance_value'>{convertFromTokenToUSD(yoloWalletAmountBN)}</div>
          </div>

          <div className='total_balance_wrapper'>
            <strong>Total balance</strong>
            <div className='total_balance_value'>
              {convertFromTokenToUSD(totalBalanceBN)}
              <span className='currency_type'>USDC</span>
            </div>
          </div>
        </div>
        <div className='wallet_top_instr'>
          <strong>Deposit USDC to start bidding</strong>
          Your Wallet is completely private and secure. Only you can access the key.
        </div>
      </div>
    </div>
  )
}
