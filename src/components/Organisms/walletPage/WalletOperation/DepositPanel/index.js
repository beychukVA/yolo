import { CreditPad } from './CreditPad'
import { ExchangeUSDCPad } from './ExchangeUSDCPad'
import { ExchangeETHPad } from './ExchangeETHPad'

export const DepositPanel = () => {
  return (
    <div className='deposit_sections_wrapper'>
      <div className='wallet_tabs_panel' id='deposit_panel'>
        <CreditPad />
        <ExchangeUSDCPad />
        <ExchangeETHPad />
      </div>
    </div>
  )
}
