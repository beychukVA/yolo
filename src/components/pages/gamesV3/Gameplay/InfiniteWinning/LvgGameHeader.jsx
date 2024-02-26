import styled from 'styled-components'
import { usePriceFeed2 } from 'hooks/gameEngine/usePriceFeed'
import { useLvgState } from 'hooks/games/lvg/useLvgState'
import { currencyFormatter } from 'utils'
import { usePriceDirection } from 'hooks/usePriceDirection'
import { LvgGameHeaderStyled } from './LvgGameHeader.styled'
import { LvgAssetsSelector } from 'components/Organisms/LvgAssetsDropDown.js'

export const LvgGameHeader = () => {
  const { activeAsset } = useLvgState()

  const { priceFeed } = usePriceFeed2(activeAsset.priceFeedSymbol)
  const { direction } = usePriceDirection(priceFeed?.price)

  return (
    <LvgGameHeaderStyled>
      <div className='game_header iw'>
        <div class='volume_display'>
          <div class='icon'></div>
          <label>FUTURE$</label>
          <div class='live_now'>LIVE</div>
        </div>
        <div className={`current_price_display ${direction}`}>
          <div className={`price_direction_icon ${direction}`}></div>
          <label>
            {currencyFormatter(priceFeed?.price, {
              noCurrencySign: true,
              decimalDigits: activeAsset.fiatDecimals >= 3 ? activeAsset.fiatDecimals : 3
            })}
          </label>
        </div>
        <div className={`asset_display asset `}>
          <RowAsset>
            <LvgAssetsSelector />
          </RowAsset>
        </div>
      </div>
    </LvgGameHeaderStyled>
  )
}

const RowAsset = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`
