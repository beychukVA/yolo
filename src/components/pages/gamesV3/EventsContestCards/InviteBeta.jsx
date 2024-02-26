import styled from 'styled-components'
import { useLvgWaitlist } from '../Gameplay/Landing/Announcements/Modal/hooks/useLvgWaitlist'
import { EventContent } from '../StaticSummary/SummaryStatic/EventContent'

export const InviteBeta = () => {
  const { showSendInviteModal } = useLvgWaitlist()
  return (
    <EventContainer>
      <ul className='invite'>
        <li>
          <div className='event_title'>
            <span>Invite others by sharing a link and get 1% of their profits</span>
          </div>
        </li>
        <li className='now'>
          <button className='invite-games_panel' onClick={showSendInviteModal}>
            Invite
          </button>
        </li>
      </ul>
    </EventContainer>
  )
}

const EventContainer = styled(EventContent)`
  ul.invite {
    padding: 0 0 10px 0;
    margin: 0 0 10px 0;
    border-bottom: 1px dotted hsla(0, 0%, 100%, 0.2);
  }
  ul span {
    display: flex;
    line-height: 140%;
    font-weight: 400;
    white-space: normal;
  }
  li {
    font-weight: 300;
    display: flex;
    align-items: center;
  }
  button.invite-games_panel {
    outline: none;
    border: none;
    background: linear-gradient(
      180deg,
      #2159d1,
      #2159d0,
      #2158cf,
      #2057cd,
      #2056ca,
      #1f55c7,
      #1f53c3,
      #1e52c0,
      #1e51bd,
      #1d50bb,
      #1d4fba,
      #1d4fb9
    );
    text-decoration: none;
    cursor: pointer;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 100%;
    border-radius: 10px;

    padding: 8px 16px 7px 16px;
    font-weight: 700;
    background: hsla(200, 0%, 0%, 0.3);
    border: 1px solid hsla(0, 0%, 100%, 0.2);
  }
`
