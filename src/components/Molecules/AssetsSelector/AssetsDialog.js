import styled from 'styled-components'

import { Typography } from 'components/Atoms/Typography'
import { Checkbox } from 'components/Atoms/Checkbox'
import { AssetInfoRow } from 'components/Molecules/AssetsSelector/AssetInfoRow'
import { useGamesList } from 'hooks/games/useGamesList'
import { useMemo } from 'react'

export const AssetsDialog = () => {
  const { sortedGamesList, showPastGames, selectedGames, toggleShowPastGames, toggleGameSelection } = useGamesList()

  return useMemo(
    () => (
      <Content>
        {sortedGamesList.map((gameId, index) => {
          return (
            <AssetInfoRow
              gameId={gameId}
              key={`regGame-${index}`}
              checked={selectedGames.includes(gameId)}
              onChange={() => toggleGameSelection(gameId)}
            />
          )
        })}
        <StatusArea>
          <Checkbox variant='contained' checked={showPastGames} onChange={toggleShowPastGames}>
            <Typography size='0.8' variant='caption'>
              Show settled rounds
            </Typography>
          </Checkbox>
        </StatusArea>
      </Content>
    ),
    [selectedGames, showPastGames, sortedGamesList, toggleGameSelection, toggleShowPastGames]
  )
}
const Content = styled.ul``

const StatusArea = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 20px 10px 20px;
  margin: 10px 0 0 0;
  ${({ theme }) => theme.breakPoints['425px']} {
    padding: 10px;
  }
`
