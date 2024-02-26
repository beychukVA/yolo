import { useEffect, useRef, useState } from 'react'
import { LVG_ASSETS, LVG_ASSETS_TYPES } from 'constants/games/lvg/lvgAssets'
import { useLvgState } from 'hooks/games/lvg/useLvgState'
import { ASSETS_TYPES, STOCK_MARKET_TIME } from 'constants/assets'
import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'
import { isStockMarketOpen } from 'utils'
import { useYoloToast } from 'lib/yoloToasts/useYoloToast'
import {
  FilterBox,
  Header,
  Icon,
  IconSelected,
  MenuSelect,
  Name,
  NameSelected,
  SelectDropdown,
  SelectDropdownItem,
  SelectDropdownTitle,
  SelectedAsset,
  SelectWrapper
} from './LvgAssetsDropDown.styled'
import { useClickOutside } from 'utils/hooks'

const stockAssetRestrictionToastObj = {
  id: 'warningToast',
  autoClose: false,
  props: {
    message: {
      title: 'Trading with stocks have some restrictions',
      subtitle: (
        <>
          {`After the markets close at ${STOCK_MARKET_TIME.closeTimeUtc} UTC, all live and open bids`} <br />
          {`will automatically get closed.`}
        </>
      )
    }
  }
}
export const LvgAssetsSelector = () => {
  const { activeAsset, setActiveAsset } = useLvgState()
  const [isSelectOpen, setSelectOpen] = useState(false)
  const [assetsTypes, setAssetsTypes] = useState([])
  const [assets, setAssets] = useState(LVG_ASSETS)

  const dropdownRef = useRef()
  useClickOutside(dropdownRef, () => {
    if (isSelectOpen) {
      console.log('ACZ isSelectOpen::', isSelectOpen)
      setSelectOpen(false)
    }
  })
  const { yToast } = useYoloToast()

  const marketOpen = isStockMarketOpen().state

  useEffect(() => {
    if (marketOpen) return setAssetsTypes([...LVG_ASSETS_TYPES].reverse())
    else return setAssetsTypes(LVG_ASSETS_TYPES)
  }, [marketOpen])

  const toggleSelect = () => {
    setSelectOpen((prev) => !prev)
  }

  const selectAsset = (coin, isMarketClose) => {
    if (isMarketClose) return
    setSelectOpen(false)
    // if (coin.type === ASSETS_TYPES.STOCK && coin.type !== setActiveAsset.type) yToast(stockAssetRestrictionToastObj)
    if (activeAsset.type !== ASSETS_TYPES.STOCK && coin.type === ASSETS_TYPES.STOCK)
      yToast(stockAssetRestrictionToastObj)
    setActiveAsset(coin)
    setAssets(LVG_ASSETS)
  }

  const onSelectAsset = (e, coin, isMarketClose) => {
    e.stopPropagation()
    selectAsset(coin, isMarketClose)
  }

  const onFilterChange = (e) => {
    const value = e.target.value.toUpperCase()
    const filteredAssets = LVG_ASSETS.filter((asset) => asset.name.includes(value))
    setAssets(filteredAssets)
  }

  const filterBoxKeyPress = (e) => {
    switch (e.key) {
      case 'Enter':
        const firstAsset = assets[0]
        if (!firstAsset) {
          toggleSelect()
          break
        }
        const isMarketClose = firstAsset.type === ASSETS_TYPES.STOCK && !marketOpen
        selectAsset(firstAsset, isMarketClose)
        break
      case 'Escape':
        alert('escape')
        toggleSelect()
        break
      default:
        break
    }
  }

  return (
    <SelectWrapper onClick={() => setSelectOpen(true)}>
      <Header>
        {isSelectOpen && (
          <FilterBox
            type='text'
            placeholder='Search or select asset'
            autoFocus
            onChange={onFilterChange}
            onKeyPress={(e) => filterBoxKeyPress(e)}
          />
        )}
        <SelectedAsset>
          <IconSelected className='asset_icon' icon={activeAsset.icon} />
          <NameSelected className='asset_name'>{activeAsset.name}</NameSelected>
        </SelectedAsset>
        {!isSelectOpen && <MenuSelect />}
      </Header>
      {/* <SelectDropdown isShow={isSelectOpen} onMouseLeave={() => onCloseSelect()} zIndex='9'> */}
      <SelectDropdown ref={dropdownRef} isShow={isSelectOpen} zIndex='9'>
        <SingleContentToggle
          noWrapper
          toggle={!marketOpen}
          trueContent={
            <SelectDropdownItem className='info'>
              {isStockMarketOpen().reason ||
                `Stocks are currently closed for trading. The markets are open Monday to Friday from ${STOCK_MARKET_TIME.openTimeUtc} UTC to ${STOCK_MARKET_TIME.closeTimeUtc} UTC.`}
            </SelectDropdownItem>
          }
          falseContent={null}
        />
        {assetsTypes.map((type, idx) => {
          const isMarketClose = type === ASSETS_TYPES.STOCK && !marketOpen
          return (
            <>
              <SelectDropdownTitle key={idx}>
                {`${type}${type === ASSETS_TYPES.STOCK ? 's' : ''}`.toUpperCase()}
              </SelectDropdownTitle>
              {assets.map((coin, idx) => {
                if (coin.type !== type) return null
                return (
                  <SelectDropdownItem
                    key={idx}
                    onClick={(e) => onSelectAsset(e, coin, isMarketClose)}
                    disabled={isMarketClose}
                  >
                    <Icon icon={coin.icon} />
                    <Name>{coin.name}</Name>
                  </SelectDropdownItem>
                )
              })}
            </>
          )
        })}
      </SelectDropdown>
    </SelectWrapper>
  )
}
