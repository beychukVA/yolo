import { DropdownMenu } from 'components/Atoms/DropdownMenu'
import { AssetsMenu } from 'components/Molecules/AssetsSelector/AssetsMenu'
import { AssetsButton } from 'components/Molecules/AssetsSelector/AssetsButton'
import { AssetsSelectorTour } from 'components/Organisms/OnBoarding/AssetsSelector.tour'
import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'
import { useLocation, useHistory } from 'react-router-dom'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'

export const AssetsSelector = () => {
  const { activePanel, setActivePanel } = useActiveGameData()
  const location = useLocation()
  const history = useHistory()

  const isInGamePage = location.pathname === '/game/v2'
  const isInGamePanel = ['game'].includes(activePanel)

  const goToGame = !isInGamePanel || !isInGamePage

  const onGameClick = () => {
    if (!isInGamePanel) setActivePanel('game')
    if (!isInGamePage) history.push('/game')
  }

  return (
    <SingleContentToggle
      toggle={goToGame}
      trueContent={<AssetsButton onClick={onGameClick} />}
      falseContent={
        <DropdownMenu
          tourComponent={<AssetsSelectorTour />}
          menuHeader={<AssetsButton />}
          menuBody={<AssetsMenu />}
          noCloseIcon
        />
      }
    />
  )
}
