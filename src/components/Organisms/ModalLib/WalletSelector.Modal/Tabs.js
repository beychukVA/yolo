import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'
import { WalletSelector } from 'components/Molecules/WalletSelector'
import { useState } from 'react'
import { ForgotPasswordForm } from './ForgotPasswordForm'
import { SignInForm } from './SignInForm'
import { SignUpForm } from './SignUpForm'

export const Tabs = ({ closeModal, type = 'signIn', promotionalCode }) => {
  const [tabId, setTabId] = useState(type)
  const onTabClick = (tabId) => {
    setTabId(tabId)
  }
  return (
    <>
      <input className='radio' id='one' name='group' type='radio' defaultChecked={tabId === 'signIn'} />
      <input className='radio' id='two' name='group' type='radio' defaultChecked={tabId === 'signUp'} />
      <input className='radio' id='hidden_pr' name='group' type='radio' defaultChecked={tabId === 'frgtPsw'}></input>
      <div className='tabs'>
        <SingleContentToggle
          noWrapper
          toggle={tabId !== 'frgtPsw'}
          falseContent={null}
          trueContent={
            <>
              <label className='tab' id='one-tab' htmlFor='one' onClick={() => onTabClick('signIn')}>
                Sign In
              </label>
              <label className='tab' id='two-tab' htmlFor='two' onClick={() => onTabClick('signUp')}>
                Register
              </label>
            </>
          }
        />
      </div>
      <ContentSwitcherByState
        className='panels'
        activeState={tabId}
        stateObject={{
          signIn: <SignInForm onFrgtPsw={() => setTabId('frgtPsw')} />,
          signUp: <SignUpForm promotionalCode={promotionalCode} />,
          frgtPsw: <ForgotPasswordForm onReturn={() => setTabId('signIn')} />
        }}
      />
      <SingleContentToggle
        noWrapper
        toggle={tabId === 'signIn'}
        falseContent={null}
        trueContent={
          <div className='connect_crypto_network_wrapper '>
            {/* <label>Additionally, you can connect a Wallet</label>
            <WalletSelector className='single_wallet' noWrapper closeModal={closeModal} /> */}
          </div>
        }
      />
    </>
  )
}
