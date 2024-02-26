import { useMemo } from 'react'

import { DropdownMenu } from 'components/Atoms/DropdownMenu'
import { BurgerButton } from 'components/Molecules/BurgerMenu/BurgerButton'
import { LandingMenu } from 'components/Molecules/BurgerMenu/LandingMenu'
import { GameMenu } from 'components/Molecules/BurgerMenu/GameMenu'

export const BurgerMenu = ({ variant }) => {
  const menuBody = useMemo(
    () =>
      ({
        landing: <LandingMenu />,
        game: <GameMenu />
      }[variant]),
    [variant]
  )

  return <DropdownMenu menuHeader={<BurgerButton />} menuBody={menuBody} noCloseIcon />
}
