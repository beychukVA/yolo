import { icons } from 'common'
import styled, { css } from 'styled-components'

const assetDisabled = css`
  opacity: 0.5;
  cursor: not-allowed !important;
`

export const SelectDropdown = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  top: 30px;
  left: 0;
  width: 100%;
  width: 190px;

  width: content;
  padding: 0px;
  list-style: none;
  overflow: hidden;
  overflow-y: auto;
  z-index: ${({ zIndex }) => zIndex || 1};
  box-shadow: 0px 5px 8px 0px rgb(0 0 0 / 50%);
  backdrop-filter: blur(20px);
  font-size: 0.8rem;
  background: hsl(200, 23%, 5%);
  border-radius: 10px;
  margin: 0;
  /* margin-top: -50px; */
  opacity: 0;
  max-height: ${({ isShow }) => (isShow ? '300px' : '0')};
  transition: opacity 0.3s linear;
  ${({ isShow }) => (isShow ? 'opacity : 1' : '')};
`
export const SelectDropdownTitle = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  /* padding: 10px 15px; */
  background: hsla(218, 23%, 15%, 0.7);
  backdrop-filter: blur(0) !important;
  white-space: break-spaces;
  font-weight: 800 !important;
  font-size: 0.7rem;
  pointer-events: none;
  padding: 20px 15px 10px 15px !important;
`
export const SelectDropdownItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 15px !important;
  background: hsla(218, 23%, 15%, 0.7);
  backdrop-filter: blur(20px);
  white-space: break-spaces;
  font-size: 0.8rem;
  ${({ disabled }) => (disabled ? assetDisabled : '')}

  &:hover {
    background: hsl(218, 23%, 25%);
  }
  &.info {
    font-size: 0.7rem;
  }
`
export const IconSelected = styled.div`
  width: 18px;
  height: 18px;
  margin: 0 5px 0 0;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-size: contain;
`
export const NameSelected = styled.span`
  font-size: 1rem;
  font-weight: 400;
  margin: 0 15px 0 0;
  /* min-width: 60px; */
`

export const Icon = styled.div`
  width: 16px;
  height: 16px;
  margin: 0 10px 0 0 !important;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-size: contain;
`
export const Name = styled.span`
  font-weight: 300;
  margin: 0 15px 0 0 !important;
`
export const SelectWrapper = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 190px;
`

export const SelectedAsset = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 190px;
`

export const MenuSelect = styled.div`
  width: 18px;
  height: 18px;
  background: rgba(0, 0, 0, 0.2) url(${icons.arrow_up}) center 4px / auto 9px no-repeat;
  filter: invert(1);
  border-radius: 3px;
  cursor: pointer;
  transition: all 150ms ease-in;
  transform: rotate(${({ isShow }) => (isShow ? '0deg' : '-180deg')});
`
export const FilterBox = styled.input`
  border: 0;
  outline: 0;
  position: absolute;
  top: -5px;
  left: 0;
  background: hsl(218, 23%, 25%) url(${icons.search_icon}) 93% center / auto 12px no-repeat;
  transition: 0.5s ease-in-out;
  padding: 0 15px 0 15px !important;
  height: 30px;
  line-height: 100%;
  border-radius: 5px;
  font-size: 0.8rem;
  width: 190px;
`
