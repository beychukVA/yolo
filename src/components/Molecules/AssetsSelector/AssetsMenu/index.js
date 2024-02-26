import React, { useEffect, useMemo, useState } from 'react'

import { useGamesList } from 'hooks/games/useGamesList'
import { useReactGA4 } from 'GA4/useReactGA4'
import { AssetsMenuStyled } from './AssetsMenu.styled'
import { memoThis } from 'utils/react'
import { AssetInfoRow } from '../AssetInfoRow'
import { Link } from 'components/Atoms/Link'
import { GAME_TYPES } from 'constants/games/gameTypes'

export const AssetsMenu = memoThis(({ isActive, closeMenu }) => {
  const { gaEvent } = useReactGA4()
  //   const { gamesList, showPastGames, selectedGames } = useGamesList()
  const { sortedGamesList, showPastGames, selectedGames, toggleShowPastGames, toggleGameSelection } = useGamesList()

  const [activeTab, setActiveTab] = useState('one')

  const gamesList = useMemo(() => {
    const notInSortedList = selectedGames.filter((gameId) => !sortedGamesList.includes(gameId))
    return [...sortedGamesList, ...notInSortedList]
  }, [sortedGamesList, selectedGames])

  //Manage External Event Logger
  useEffect(() => {
    gaEvent('game_menu_state', {
      pathId: 'game.menu.state',
      isActive,
      gamesList,
      selectedGamesIds: (!!gamesList.length && selectedGames) || [],
      showPastGames
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive])

  return (
    <AssetsMenuStyled onClick={(e) => e.stopPropagation()}>
      <div className='assets_menu_content'>
        <Link to='/game' className='futures_link'>
          <strong>FUTURE$</strong> (Beta) <span className='new_game'>NEW</span>
        </Link>
        <form id='assets_to_select'>
          <div className='games_menu_tabs_wrapper'>
            <input
              className='radio'
              id='game_menu_tab_one'
              name='group'
              type='radio'
              checked={activeTab === 'one'}
              readOnly
            />
            <input
              className='radio'
              id='game_menu_tab_two'
              name='group'
              type='radio'
              checked={activeTab === 'two'}
              readOnly
            />
            <div className='tabs'>
              <label className='rl'>Choose up to 3 markets to display</label>
              <div className='tab_wrapper'>
                <label className='tab' id='one-tab' htmlFor='game_menu_tab_one' onClick={() => setActiveTab('one')}>
                  3 min rounds
                </label>
                <label className='tab' id='two-tab' htmlFor='game_menu_tab_two' onClick={() => setActiveTab('two')}>
                  Day rounds
                </label>
              </div>
            </div>
            <div className='panels'>
              <div className='panel' id='one-panel'>
                <ul>
                  {gamesList.map((gameId, index) => {
                    return (
                      <AssetInfoRow
                        gameId={gameId}
                        key={`regGame-${index}`}
                        checked={selectedGames.includes(gameId)}
                        onChange={() => toggleGameSelection(gameId)}
                        gameTypeFilter={GAME_TYPES.G_3MIN}
                      />
                    )
                  })}
                </ul>
              </div>

              <div className='panel' id='two-panel'>
                <ul>
                  {gamesList.map((gameId, index) => {
                    return (
                      <AssetInfoRow
                        gameId={gameId}
                        key={`regGame-${index}`}
                        checked={selectedGames.includes(gameId)}
                        onChange={() => toggleGameSelection(gameId)}
                        gameTypeFilter={GAME_TYPES.G_24HR}
                      />
                    )
                  })}
                </ul>
              </div>
              <div className='show_past_games_selection'>
                <input type='checkbox' id='show_past_games' checked={showPastGames} onChange={toggleShowPastGames} />
                <label className='select_game' htmlFor='show_past_games'>
                  Show settled rounds
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AssetsMenuStyled>
  )
})
