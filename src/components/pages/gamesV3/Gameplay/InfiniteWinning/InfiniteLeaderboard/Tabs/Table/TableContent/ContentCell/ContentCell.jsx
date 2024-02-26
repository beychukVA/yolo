import { LVG_ORDER_STATE } from 'constants/index'
import React from 'react'
import styled from 'styled-components'

const ContentCell = ({ className = '', padding = false, children, field, value, onCellClick, content, activeUuid }) => {
  const onClick = () => {
    if (field === '-') return
    if (content?.Status !== LVG_ORDER_STATE.LIVE) return
    onCellClick(content)
  }

  return (
    <Cell
      className={className}
      padding={padding}
      field={field}
      value={value}
      onClick={onClick}
      pointer={content?.Status === LVG_ORDER_STATE.LIVE}
    >
      {children}
    </Cell>
  )
}

export default ContentCell

const Cell = styled.label`
  z-index: 0;
  position: relative;
  padding: ${({ padding }) => (padding ? '6px 10px 5px 10px' : '12px 10px 10px 10px')};
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.8rem;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 500;
  min-height: 45px;
  ${({ theme }) => theme.breakPoints['1024px']} {
    width: 100%;
  }
  color: ${({ field, value }) => (field === 'Status' ? (value === LVG_ORDER_STATE.LIVE ? '#2058cf' : '#808080') : '')};
  &:hover {
    cursor: ${({ pointer }) => (pointer ? 'pointer' : 'default')};
  }
`
