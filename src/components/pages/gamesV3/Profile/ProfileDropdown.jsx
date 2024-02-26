import styled from 'styled-components'
import { useBidderData } from 'datasource/biddersDashboard'
import { useXftProgress } from 'hooks/xftCampaign/useXftProgress'
import { ASYNC_STATUS_ID } from 'constants/index'
import { XFT_LEVELS } from 'constants/xftLevels'
import { UserIdForm } from 'components/Molecules/UserIdForm'
import { AvatarForm } from 'components/Molecules/AvatarForm'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { IconLib } from 'components/Atoms/IconLib'
import { currencyFormatter } from 'utils'
import { Link } from 'components/Atoms/Link'
import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'
import { useSignInUpOut } from 'hooks/user/useSignInUpOut'
import { useYoloModal } from 'lib/yoloModals/useYoloModal'
import { useWalletConnection } from 'hooks/useWalletConnection'

export const ProfileDropdown = ({ isOpenDropdown, closeMenu }) => {
  const { updateModal } = useYoloModal()
  // const { xftLevel, roundCountLeft, cumulativeAmountLeft } = useXftProgress()
  // const nftProps = useMemo(() => XFT_LEVELS[xftLevel.dec], [xftLevel.dec])
  const { data: bidderData, hasStatus } = useBidderData()
  const { counts, amounts } = bidderData || {}
  const isPending = hasStatus(ASYNC_STATUS_ID.PENDING)
  const { signOut } = useSignInUpOut()
  const { disconnectWallet } = useWalletConnection()

  const userAccountModalObj = {
    show: true,
    id: 'userAccount',
    backdropClose: false
  }

  const showUserAccountModal = () => updateModal(userAccountModalObj)

  return (
    <StyledMenu isOpen={isOpenDropdown} onClick={(e) => e.stopPropagation()}>
      <UserFormWrapper>
        <AvatarForm />
        <UsernameWrapper>
          <UserFormLabel>User ID</UserFormLabel>
          <UserForm onSaveClick={closeMenu} />
        </UsernameWrapper>
      </UserFormWrapper>
      {/* <BidderStatsContainer>
        <BidderStatsSection>
          <Title>Your total bids</Title>
          <StatsValue>
            <SingleDataLoader loading={isPending} data={counts?.allBids} />
          </StatsValue>
        </BidderStatsSection>
        <BidderStatsSection>
          <Title>Your total bids amount</Title>
          <StatsValue>
            <SingleDataLoader loading={isPending} data={amounts?.allAmount?.formatted} />
          </StatsValue>
        </BidderStatsSection>
      </BidderStatsContainer> */}
      <ButtonContainer>
        {/* <Button
          onClick={() => {
            showUserAccountModal()
            if (isOpenDropdown) {
              closeMenu()
            }
          }}
        >
          Profile
        </Button> */}
        {/* <ButtonLink to='/game/bidder-dashboard'>Dashboard</ButtonLink> */}
      </ButtonContainer>
      <SignOutLink
        onClick={() => {
          signOut()
          disconnectWallet()
          // closeMenu()
        }}
      >
        Sign out
      </SignOutLink>
      {/* <NftLevel> */}
      {/* <NftRow>
          <IconNft {...nftProps.iconProps} />
          <NftDetailsWrap>
            <NftTitle color={nftProps.color}>{`${nftProps.caption}`} </NftTitle>
            <NftDescription>
              <SingleContentToggle
                toggle={xftLevel.dec === 0}
                trueContent={
                  <strong>
                    Learn more on our&nbsp;<Link to='/game/yoloxft'>XFT Page</Link>
                  </strong>
                }
                falseContent={
                  <div className='column'>
                    <strong>{`You are at a Level ${xftLevel.dec}  NFT`}</strong>
                    <strong>{`Here's what you need to upgrade:`}</strong>
                  </div>
                }
              />
            </NftDescription>
          </NftDetailsWrap>
        </NftRow> */}
      {/* <NftRow bkground={nftProps.background10}>
          <Empty />
          <Feature>
            <Title className='bold'>Total bids needed</Title>
            <NftValue color={nftProps.color}> {roundCountLeft.toNumber()} </NftValue>
          </Feature>
          <Feature>
            <Title className='bold'>Total bids amount needed</Title>
            <NftValue color={nftProps.color}> */}
      {/* {cumulativeAmountLeft > 0 ? '+' : ''} */}
      {/* {currencyFormatter(cumulativeAmountLeft.toString())} */}
      {/* </NftValue>
          </Feature>
        </NftRow> */}
      {/* </NftLevel> */}
    </StyledMenu>
  )
}

const StyledMenu = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  margin: 10px 0 0 0;
  padding: 20px;
  width: fit-content;
  min-width: 300px;
  z-index: 2;
  background: hsla(220, 18%, 10%, 0.2);
  border-radius: 5px;
  list-style: none;
  -webkit-backdrop-filter: blur(40px);
  backdrop-filter: blur(40px);
  display: flex;
  flex-direction: column;
  cursor: default;
  justify-content: flex-start;
  -webkit-box-shadow: 0 0 45px 20px hsl(0deg 0% 0% / 40%);
  box-shadow: 0 0 45px 20px hsl(0deg 0% 0% / 40%);
  transition: all 250ms ease;
  transform: translateY(${({ isOpen }) => (isOpen ? '0' : '-50%')})
    translateX(${({ isOpen }) => (isOpen ? '0' : '-50%')}) scale(${({ isOpen }) => (isOpen ? '1' : '0')});
`

const UserForm = styled(UserIdForm)`
  flex-direction: row;
  white-space: nowrap;
  align-items: center;
  width: 100%;
  display: flex;
  padding: 5px 0 0 0;

  & > input {
    margin: 0;
  }
`

const UserFormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  & div:first-child {
    margin: 0 20px 0 0;
  }
`
const UsernameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

const UserFormLabel = styled.label``

const BidderStatsContainer = styled.div`
  width: 100%;
  flex-direction: column;
  border-top: 1px solid hsla(0, 0%, 100%, 0.1);
  margin: 10px 0 0 0;
  padding: 10px 0 0 0;
`
const BidderStatsSection = styled.div`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  width: 100%;
  :first-child {
    padding: 0 0 5px 0;
  }
`

const Title = styled.div`
  font-size: 0.75rem;
  justify-content: center;
`

const StatsValue = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
`
const NftValue = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  color: ${({ color }) => color};
`

const NftLevel = styled.div`
  background: rgba(0, 0, 0, 0.2);
  margin: 10px 0;
  flex-direction: column;
  border-radius: 10px;
`
const NftRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0 15px;
  :first-child {
    padding: 10px 15px;
  }
  &:last-child {
    padding: 10px 0 8px 60px;
    border-radius: 0 0 10px 10px;
    flex-direction: column;
    /* background: hsla(116, 90%, 35%, 0.3); */
    background: ${({ bkground }) => bkground};

    & > :last-child {
      margin-top: 5px;
    }
  }
`
const IconNft = styled(IconLib).attrs({
  dimension: '58px'
})`
  background-position: left center;
  background-size: auto 36px;
  background-repeat: no-repeat;
  width: 36px;
  height: 36px;
`
const NftDetailsWrap = styled.div`
  flex-direction: column;
  justify-content: center;
  margin: 0 0 0 10px;
  /* border-bottom: 1px solid rgba(255,255,255,.2); */
  border-bottom: 0;
  width: calc(100% - 42px);
`
const NftTitle = styled.div`
  display: flex;
  font-size: 0.9rem;
  font-weight: 700;
  margin: 0 0 4px 0;
  line-height: 140%;
  color: ${({ color }) => color};
`
const NftDescription = styled.div`
  display: flex;
  font-size: 0.7rem;
  line-height: 120%;
  opacity: 1;

  .column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`
const Empty = styled.div`
  display: flex;
  width: 0;
`
const Feature = styled.div`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  /* padding: 8px 0 0 0; */
  font-size: 0.8rem;
  width: 100%;

  .bold {
    font-weight: 600;
    font-size: 0.7rem;
  }
`
const BottomLinks = styled.div`
  display: flex;
  justify-content: space-between;
  list-style: none;
  flex-direction: row;
  text-align: center;
`
const SignOutLink = styled.button`
  display: flex;
  cursor: pointer;
  border-bottom: 1px dotted hsla(0, 0%, 100%, 0.3);
  width: fit-content;
  text-decoration: none;
  :hover {
    color: #fff;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 0;
  margin: 0 0 15px 0;
  list-style: none;
  flex-direction: row;
  text-align: left;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
`
const Button = styled.button`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: hsla(0, 0%, 100%, 0.15);
  margin: 0 5px 0 0;
  padding: 6px 10px;
  border-radius: 10px;
  transition: all 250ms ease;

  &:hover {
    background: hsla(0, 0%, 100%, 0.1);
  }
`
const ButtonLink = styled(Link)`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: hsla(0, 0%, 100%, 0.15);
  margin: 0 5px 0 0;
  padding: 6px 10px;
  border-radius: 10px;
  transition: all 250ms ease;
  text-decoration: none;
  color: '#fff';

  &:hover {
    background: hsla(0, 0%, 100%, 0.1);
    color: inherit;
  }
`
