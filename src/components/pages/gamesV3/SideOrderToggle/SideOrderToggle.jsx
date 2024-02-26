import { useState, useEffect } from 'react'
import { SideOrderToggleCSS } from './SideOrderToggleCSS.styled'

export const SideOrderToggle = ({ onToggle, context }) => {
  const [checked, setChecked] = useState(false)
  useEffect(() => onToggle(checked), [onToggle, checked])

  return (
    <SideOrderToggleCSS context={context}>
      <div style={{ padding: context === 'roi-calculator' ? '0 0 0 30px' : '' }} className='row subtitle'>
        Bid Direction
      </div>
      <div className='pd_switch_wrapper'>
        <input type='checkbox' id={`${context}-pd_switch`} onChange={() => setChecked(!checked)} checked={checked} />
        <div className='price_direction_switch'>
          <div className='pd_bg'>
            <div className='pd_content'>
              <label htmlFor={`${context}-pd_switch`}>
                <div className='pd_toggle'></div>
                <div className='names'>
                  <p className='up'>
                    <span className='price_direction_icon up'></span>Up
                  </p>
                  <p className='down'>
                    <span className='price_direction_icon down'></span>Down
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </SideOrderToggleCSS>
  )
}
