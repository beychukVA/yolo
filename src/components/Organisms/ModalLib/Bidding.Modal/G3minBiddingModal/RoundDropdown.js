import { DropdownMenu } from 'components/Atoms/DropdownMenu'
import styled from 'styled-components'
import { RoundMenu } from './RoundMenu'
import { IconLib } from 'components/Atoms/IconLib'

export const RoundDropdown = ({ round, setRound, activeRound }) => {
  const RoundMenuHeader = ({ isActive }) => (
    <div className='round'>
      {round}
      <SelectionIcon>
        <Triangle masking></Triangle>
      </SelectionIcon>
    </div>
  )
  const RoundMenuBody = <RoundMenu open activeRound={activeRound} setSelectedRound={setRound} />
  return <DropdownMenu menuHeader={<RoundMenuHeader />} menuBody={RoundMenuBody} />
}

const SelectionIcon = styled.div`
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  align-self: center;
  margin: 0 0 0 5px;
`
const Triangle = styled(IconLib).attrs({ collection: 'general', name: 'arrowUp', rotate: 'up', dimension: '12px' })`
  background: #fff;
`
