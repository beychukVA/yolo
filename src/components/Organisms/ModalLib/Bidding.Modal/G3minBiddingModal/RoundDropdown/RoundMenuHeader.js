export const RoundMenuHeader = ({ isActive, round, setRound, activeRound }) => {
  return (
    <div className='round'>
      {round}
      <div className='selection_icon'>
        <div className='triangle down'></div>
      </div>
    </div>
  )
}
