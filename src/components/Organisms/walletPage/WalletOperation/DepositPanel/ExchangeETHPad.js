import { IconLib } from 'components/Atoms/IconLib'
import { useUser } from 'hooks/user/useUser'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { doCopy } from 'utils'

export const ExchangeETHPad = () => {
  const inputRef = useRef()
  const [hasCopied, setHasCopied] = useState(false)
  const { account, isProxy } = useUser('wallet')

  useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => {
        setHasCopied(false)
        inputRef.current.blur()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  const onCopy = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    const copied = await doCopy(account)

    if (copied) setHasCopied(true)
  }

  return isProxy ? (
    <div className='tabbed_section'>
      <div className='panel_title' style={{ color: 'rgba(135,187,250,1.0)' }}>
        ETHEREUM NETWORK
      </div>
      <div>Deposit funds from an Exchange via Ethereum</div>
      {/* <div className='panel_desc'></div> */}
      <div className='panel_desc'>(min. deposit 0.005 ETH)</div>
      <form className='polygon'>
        <div className='withdraw_assistance'>
          Copy the address and paste it into the field at the Ethereum exchange of your choice.
        </div>
        <div className='label_row'>
          <label>Send ETH to</label>
          <label className='max_amount'></label>
        </div>
        <ShowText onClick={onCopy}>
          <div ref={inputRef} className='mm_address_bottom' onClick={onCopy}>
            <div className='wallet_id_full'>
              <span>{account}</span>
              <CopyIcon collection='general' name={hasCopied ? 'tick' : 'copy'} masking />
            </div>
            <div class='information_message'>Ethereum deposits may take 15-30 minutes to reflect in your balance</div>
          </div>
        </ShowText>
      </form>
    </div>
  ) : null
}

const ShowText = styled.div`
  width: 100%;
  position: relative;
  border-radius: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin: 0 5px;
`
const CopyIcon = styled(IconLib).attrs({ dimension: '16px' })`
  position: absolute;
  right: 15px;
  margin: 0 0 0 10px;
`
