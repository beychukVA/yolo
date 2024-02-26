import React from 'react'
import styled from 'styled-components'

const HeaderCell = ({ children, onClick, sortBy }) => {
  return (
    <Cell onClick={() => onClick({ fieldName: children, isSortUp: !sortBy.isSortUp })}>
      {children}
      {children && <TriangleButton rotateUp={sortBy.isSortUp && sortBy.fieldName === children} />}
    </Cell>
  )
}

export default HeaderCell

const Cell = styled.label`
  position: sticky;
  top: 0%;
  font-size: 0.75rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
  border-top: 1px solid transparent;
  cursor: pointer;
  color: hsl(214, 5%, 30%);
  font-weight: 600;
  background: hsl(223, 17%, 8%);
  z-index: 1;
  text-align: left;
  padding: 12px 10px 10px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  &:hover {
    border-top: 1px solid hsla(221, 73%, 47%, 0.5);
    color: hsl(214, 5%, 80%);
    div {
      opacity: 1;
    }
  }
  ${({ theme }) => theme.breakPoints['1024px']} {
    color: hsl(214, 5%, 80%);
  }
`

const TriangleButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  /* border-radius: 5px; */
  width: 17px;
  height: 17px;
  margin-left: 6px;
  opacity: ${({ opacity }) => (opacity ? 1 : 0.5)};
  transition: all 150ms ease;
  transform: rotate(0deg);
  transform: rotate(${({ rotateUp }) => (rotateUp ? '0deg' : '180deg')});
  ${({ theme }) => theme.breakPoints['1024px']} {
    display: none;
  }
  &::before {
    content: '';
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid white;
  }
`
