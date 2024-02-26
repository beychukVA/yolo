import { ClaimPad } from './ClaimPad'
import { WithdrawPad } from './WithdrawPad'

export const WithdrawPanel = () => {
  return (
    <div className='withdraw_sections_wrapper'>
      <div className='wallet_tabs_panel' id='withdraw_panel'>
        <ClaimPad />
        <WithdrawPad />
      </div>
    </div>
  )
}
