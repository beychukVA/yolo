import React from 'react'

import { New24hrGamesModalCss } from './New24hrGamesModalCss.styled'
import { images } from 'common'

export const New24hrGamesModal = ({ closeModal }) => {
  return (
    <New24hrGamesModalCss>
      <div className='alert newgame'>
        <div className='window'>
          <h1>New Day Games</h1>
          <h3>
            In addition to the 3 minute game, we now have new SPY and Day-long games! To get started, click on GAMES
            then “Day rounds” - and be sure the box(es) are checked.
          </h3>
          <div className='alert_image'>
            <img alt='GameMenuScreenshot' src={images.games_menu_day_ss} />
          </div>
          <button onClick={closeModal}>GOT IT</button>
        </div>
      </div>
    </New24hrGamesModalCss>
  )
}
