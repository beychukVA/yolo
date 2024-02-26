import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { ClaimSection } from 'components/Organisms/BidderDashboard/ClaimSection'
import { useUnclaimedBalance } from 'hooks/unclaimedEarning/useUnclaimedBalance'
import { useUser } from 'hooks/user/useUser'
import styled from 'styled-components'

export const ClaimPad = () => {
  const { isProxy } = useUser('wallet')

  const {
    data: { hasUnclaimedRounds },
    isLoading: isUnclaimedLoading
  } = useUnclaimedBalance()

  return isProxy ? null : (
    <div className='tabbed_section'>
      <div className='panel_title'>Unclaimed Winnings</div>
      <div className='panel_desc'>When you're connected with MetaMask, you can withdraw your winnings here.</div>
      <SingleContentToggle
        noWrapper
        toggle={hasUnclaimedRounds}
        trueContent={<ClaimSection />}
        falseContent={
          <NoEarningsContainer className='main_cards full user_dashboard'>
            <div className='header_1'>Unclaimed Earnings</div>
            <Panels>
              <SingleDataLoader loading={isUnclaimedLoading} data={<>No earnings available</>} />
            </Panels>
          </NoEarningsContainer>
        }
      />
    </div>
  )
}

const NoEarningsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0;
  width: 100%;

  @media only screen and (max-width: 750px) {
    width: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  @media (max-width: 576px) {
  }
  .header_1 {
    margin: 0 0 10px 0;
  }
`

const Panels = styled.div`
  overflow: hidden;
  width: 100%;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 25px 15px 15px 25px;
  min-height: 80px;
  display: flex;
  flex-direction: column;
`
