import { DropdownMenu } from 'components/Atoms/DropdownMenu'
import { RoundMenuBody } from './RoundMenuBody'
import { RoundMenuHeader } from './RoundMenuHeader'

export const RoundDropdown = ({ round, setRound, activeRound }) => {
  return (
    <DropdownMenu
      menuHeader={<RoundMenuHeader {...{ round, setRound, activeRound }} />}
      menuBody={<RoundMenuBody open activeRound={activeRound} setSelectedRound={setRound} />}
    />
  )
}
