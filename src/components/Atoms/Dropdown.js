import styled from 'styled-components'

import { IconLib } from 'components/Atoms/IconLib'

export const Dropdown = ({ label, value, options, onChange, className }) => {
  const dropdownOnChange = (e) => {
    const fieldName = e.target.value
    onChange((prev) => ({ ...prev, fieldName }))
  }
  const sortArrowClick = () => {
    onChange({ fieldName: value.fieldName, isSortUp: !value.isSortUp })
  }
  return (
    <DropdownWrapper className={className}>
      <Label htmlFor='select_form' className='sort_by'>
        {label}
      </Label>
      <DropdownSelectWrapper>
        <Select name='selected_stats' value={value.fieldName} onChange={dropdownOnChange}>
          {options.map((option, idx) => (
            <SelectOption key={idx} value={option}>
              {option}
            </SelectOption>
          ))}
        </Select>
      </DropdownSelectWrapper>
      <SelectArrowWrapper onClick={sortArrowClick}>
        <SelectArrow isUp={!value.isSortUp} />
      </SelectArrowWrapper>
    </DropdownWrapper>
  )
}

const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 15px 0;
`
const DropdownSelectWrapper = styled.div`
  display: grid;
  grid-template-areas: 'select';
  align-items: center;
  position: relative;
  border-radius: 10px;
  font-size: 0.8rem;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  margin: 0 0 0 5px !important;
  justify-content: flex-start;
`
const Label = styled.label`
  font-size: 0.8rem;
`
const Select = styled.select`
  appearance: none;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  z-index: 1;
  outline: none;
  color: #fff;
  position: relative;
  padding: 6px 30px 6px 15px !important;
  border-radius: 10px;
`
const SelectOption = styled.option`
  color: #fff;
  background: #141e27;

  &[selected] {
    background: #8a8f93;
  }
`
const SelectArrowWrapper = styled.div`
  padding: 8px 10px !important;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  margin: 0 0 0 5px !important;
  display: flex;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`
const SelectArrow = styled(IconLib).attrs(({ isUp }) => ({
  id: 'arrow',
  collection: 'general',
  name: 'arrow',
  dimension: '12px',
  rotate: isUp ? 'up' : 'down'
}))``
