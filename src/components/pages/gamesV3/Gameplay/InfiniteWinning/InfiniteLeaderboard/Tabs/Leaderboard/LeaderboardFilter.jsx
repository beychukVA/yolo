import { icons } from 'common'
import { useGetWeek } from 'components/pages/leaderboard/hooks/useGetWeek'
import { LVG_ASSETS } from 'constants/games/lvg/lvgAssets'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'
import styled from 'styled-components'

export const LeaderboardFilter = ({ onChangeFilterAsset, onChangeFilterTime }) => {
  const { currentWeek } = useGetWeek()
  const timeSlots = [
    { name: 'Today', date: new Date().toLocaleDateString('en-US') },
    { name: 'This week', date: currentWeek },
    { name: 'This month', date: new Date().toLocaleDateString('en-US') }
  ]
  const [assetInput, setAssetInput] = useState('')
  const [isAssetInputSelected, setAssetInputSelected] = useState(false)
  const [currentTime, setCurrentTime] = useState(timeSlots[0])
  const [isTimeSelectOpen, setTimeSelectOpen] = useState(false)

  useEffect(() => onChangeFilterTime(currentTime), [])

  const toggleTimeSelect = () => setTimeSelectOpen(!isTimeSelectOpen)

  const filteredAssets = useMemo(() => {
    return LVG_ASSETS.filter((asset) =>
      asset.name
        ?.toLowerCase()
        .replace(/[^\w]+/g)
        ?.includes(assetInput?.toLowerCase()?.replace(/[^\w]+/g))
    )
  }, [assetInput])

  return (
    <FilterContainer>
      <Title>Filter by</Title>
      <FilterByAsset>
        <AssetInput
          value={assetInput}
          onChange={(e) => {
            setAssetInput(e.target.value)
            if (e.target.value === '') {
              onChangeFilterAsset(null)
            }
          }}
          className='chosen-value'
          type='text'
          onFocus={() => setAssetInputSelected(true)}
          onBlur={() => setAssetInputSelected(false)}
          placeholder={isAssetInputSelected ? 'Type to filter' : 'Asset'}
        />
        <AssetDropdown className={`value-list ${isAssetInputSelected ? 'open' : ''}`}>
          {filteredAssets.map((asset, index) => (
            <li
              key={index}
              onClick={() => {
                onChangeFilterAsset(asset)
                setAssetInput(asset.name)
                setAssetInputSelected(false)
              }}
            >
              <AssetIcon icon={asset.icon} />
              {asset.name}
            </li>
          ))}
        </AssetDropdown>
      </FilterByAsset>
      <FilterByTime onClick={() => toggleTimeSelect()}>
        <Time>{currentTime.name}</Time>
        <MenuSelect isShow={isTimeSelectOpen} />
        <SelectDropdown isShow={isTimeSelectOpen}>
          {timeSlots.map((time, idx) => (
            <SelectDropdownItem
              key={idx}
              onClick={() => {
                setCurrentTime(time)
                onChangeFilterTime(time)
                toggleTimeSelect()
              }}
            >
              <Time>{time.name}</Time>
            </SelectDropdownItem>
          ))}
        </SelectDropdown>
      </FilterByTime>
    </FilterContainer>
  )
}

const FilterByTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  height: 30px;
  width: 130px;
  border-radius: 5px;
  cursor: pointer;
  background: hsl(218, 23%, 15%);
  transition: 0.5s ease-in-out;
  padding: 0 15px;

  &::-webkit-input-placeholder {
    color: #fff;
  }

  &:hover {
    background: hsl(218, 23%, 25%);
    cursor: pointer;
  }
`

const SelectDropdownItem = styled.li`
  display: block;
  padding: 10px 15px;
  background: hsla(218, 23%, 15%, 0.7);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);

  &:hover,
  &:focus {
    background: hsla(221, 16%, 85%, 0.2);
    backdrop-filter: blur(20px);
  }
`

const SelectDropdown = styled.ul`
  position: absolute;
  top: 30px;
  left: 0;
  width: 100%;
  list-style: none;
  background-color: hsl(213, 19%, 11%);
  overflow: hidden;
  -webkit-transition: max-height 0.2s linear;
  -moz-transition: max-height 0.2s linear;
  transition: max-height 0.2s linear;
  z-index: 1;
  box-shadow: 0px 5px 8px 0px rgb(0 0 0 / 50%);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);

  max-height: ${({ isShow }) => (isShow ? '200px' : '0')};

  & :last-child {
    border-radius: 0 0 5px 5px;
  }
`

const MenuSelect = styled.div`
  width: 18px;
  height: 18px;
  background: rgba(0, 0, 0, 0.2) url(${icons.arrow_up}) center 4px / auto 9px no-repeat;
  filter: invert(1);
  border-radius: 3px;
  cursor: pointer;
  transition: all 150ms ease-in;
  transform: rotate(${({ isShow }) => (isShow ? '0deg' : '-180deg')});
`

const Time = styled.span`
  font-size: 0.8rem;
`

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0 0 10px;
  width: 100%;
`
const Title = styled.h1`
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
  align-self: center;
`
const FilterByAsset = styled.div`
  position: relative;
  width: 130px;
  height: auto;
  z-index: 2;
  margin: 0 5px 0 10px;

  & .chosen-value {
    background: hsl(218, 23%, 15%);
    transition: 0.5s ease-in-out;
    padding: 0 15px;
    height: 30px;
    line-height: 100%;
    border-radius: 5px;
    font-size: 0.8rem;
    width: 130px;
    position: absolute;
    top: 0;
    left: 0;
  }

  & .chosen-value::-webkit-input-placeholder {
    color: #fff;
  }

  & .chosen-value:focus,
  & .chosen-value.open {
    box-shadow: 0px 5px 8px 0px rgb(0 0 0 / 50%);
    outline: 0;
    background: hsl(218, 23%, 28%);
    color: #aaa;
    width: 130px;
  }

  & .chosen-value:focus::-webkit-input-placeholder,
  & .chosen-value.open::-webkit-input-placeholder {
    color: #aaa;
  }

  & .chosen-value:hover {
    background: hsl(218, 23%, 25%);
    cursor: pointer;
  }

  & .chosen-value:hover::-webkit-input-placeholder {
    color: #aaa;
  }

  & .value-list {
    position: absolute;
    left: 0;
    top: 30px;
    width: 130px;
    box-shadow: 0px 5px 8px 0px rgb(0 0 0 / 50%);
    overflow: hidden;
    max-height: 0;
    transition: 0.5s ease-in-out;
    list-style: none;
  }

  & .value-list.open {
    max-height: 215px;
    width: 130px;
    overflow: auto;
    border-radius: 0 0 5px 5px;
  }

  & .value-list li {
    position: relative;
    background: hsla(218, 23%, 15%, 0.7);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    padding: 10px 15px;
    width: 130px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.5s;
    opacity: 1;
    list-style: none;
  }

  & .value-list li:hover {
    background: hsla(221, 16%, 85%, 0.2);
    backdrop-filter: blur(20px);
  }

  & .value-list li.closed {
    max-height: 0;
    overflow: hidden;
    padding: 0;
    opacity: 0;
    width: 130px;
  }
`
const AssetInput = styled.input`
  border: 0;
  outline: 0;
`
const AssetDropdown = styled.ul``

const AssetIcon = styled.div`
  height: 14px;
  width: 14px;
  margin: 0 4px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${({ icon }) => icon});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
`
