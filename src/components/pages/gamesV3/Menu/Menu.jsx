import React from 'react'
import styled from 'styled-components'
import { BurgerMenu } from 'components/Molecules/BurgerMenu'

const Menu = () => {
  return (
    <MenuArea>
      <BurgerMenu variant='game' />
    </MenuArea>
  )
}

export default Menu

const MenuArea = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
