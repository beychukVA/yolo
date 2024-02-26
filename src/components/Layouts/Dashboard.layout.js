import styled from 'styled-components'

import { WalletFooter } from 'components/Organisms/Footers/WalletFooter'
import { ContestLayout } from 'components/Layouts/Contest.layout'
import { GameHeader } from 'components/Organisms/Headers/GameHeader'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'

export const DashboardLayout = ({ children }) => {
  const { setActivePanel } = useActiveGameData()
  return (
    <PageLayout>
      <GameHeader gridArea='header' onItemClick={(activePanel) => setActivePanel(activePanel.id)} />
      {children}
      <WalletFooter gridArea='footer' />
    </PageLayout>
  )
}
const PageLayout = styled(ContestLayout)`
  grid-template:
    'header' auto
    'content' 1fr
    'footer' auto
    / 1fr;
  height: 100vh;
`
