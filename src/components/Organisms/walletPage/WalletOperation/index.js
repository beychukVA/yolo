import styled from 'styled-components'
import { DepositPanel } from './DepositPanel'
import { WithdrawPanel } from './WithdrawPanel'

export const WalletOperation = ({ activeTab, setActiveTab }) => {
  return (
    <TabWrapper>
      <input
        className='radio'
        id='deposit_tab_one'
        name='wallet_tabs_group_1'
        type='radio'
        checked={activeTab === 'deposit'}
        readOnly
      />
      <input
        className='radio'
        id='withdraw_tab_two'
        name='wallet_tabs_group_1'
        type='radio'
        checked={activeTab === 'withdraw'}
        readOnly
      />
      <TabsContainer>
        <Tab id='deposit_tab' htmlFor='deposit_tab_one' onClick={() => setActiveTab('deposit')}>
          Deposit
        </Tab>
        <Tab id='withdraw_tab' htmlFor='withdraw_tab_two' onClick={() => setActiveTab('withdraw')}>
          Withdraw
        </Tab>
      </TabsContainer>

      <PanelContainer>
        <DepositPanel />
        <WithdrawPanel />
      </PanelContainer>
    </TabWrapper>
  )
}

const TabWrapper = styled.div.attrs((props) => {
  return {
    className: 'wallet_tabs_wrapper'
  }
})``
const TabsContainer = styled.div.attrs((props) => {
  return {
    className: 'tabs'
  }
})``
const Tab = styled.label.attrs((props) => {
  return {
    className: 'wallet_tab_1'
  }
})``
const PanelContainer = styled.div.attrs((props) => {
  return {
    className: 'wallet_panels_1'
  }
})``
