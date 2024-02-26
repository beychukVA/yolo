import React from 'react'

import { DropdownMenu } from 'components/Atoms/DropdownMenu'
import { HeaderDropdownItemBody } from './HeaderDropdownItemBody'
import { HeaderItem } from 'components/Organisms/Headers/GameHeader/HeaderItem'

export const HeaderDropdownItem = ({ children, emphasis, badgeIcon, menuItems }) => (
  <DropdownMenu
    menuHeader={<HeaderItem children={children} badgeIcon={badgeIcon} emphasis={emphasis} />}
    menuBody={<HeaderDropdownItemBody menuItems={menuItems} />}
    noCloseIcon
  />
)
