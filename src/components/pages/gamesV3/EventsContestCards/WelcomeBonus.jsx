import { EventContent } from '../StaticSummary/SummaryStatic/EventContent'

export const WelcomeBonus = () => {
  return (
    <EventContent>
      <ul className='now'>
        <li>
          <div className='icon'></div>
          <div className='event_title'>
            <span>WELCOMEBONUS (v2)</span>
            <a href='/game/leaderboard'>Learn more</a>
          </div>
        </li>
        <li className='now'>ACTIVE</li>
      </ul>
    </EventContent>
  )
}
