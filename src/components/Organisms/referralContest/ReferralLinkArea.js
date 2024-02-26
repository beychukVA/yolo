import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'
import { ReferralForm } from 'components/Molecules/ReferralForm'
import { API } from 'constants/apiEndPoints'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAPI } from 'utils/hooks/useAPI'
import { isEmail } from 'validator'
import { notificationActions } from 'redux/actions'
import { useDispatch } from 'react-redux'
import { ASYNC_STATUS_ID } from 'constants/index'
import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { IconLib } from 'components/Atoms/IconLib'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { useTimeoutWhen } from 'utils/hooks/useTimeoutWhen'
import { useReferralData } from 'datasource/referralContest/useReferralData'

const referralToast = (type) => ({
  show: true,
  id: 'referral',
  props: { type }
})

const referralErrorToast = (type) => ({
  show: true,
  id: 'genericError',
  props: { type }
})

export const ReferralLinkArea = () => {
  const dispatch = useDispatch()
  const { data: referralData, hasStatus: hasReferralStatus } = useReferralData()

  const [referralEmailState, sendReferralEmail, hasStatus, resetStatus] = useAPI(API.REFERRALS_SEND, {
    controlled: true,
    withJwt: true
  })
  const [edit, toggleEdit] = useState(false)
  const [error, setError] = useState(false)

  useTimeoutWhen(
    () => {
      resetStatus()
    },
    5000,
    hasStatus(ASYNC_STATUS_ID.CONFIRMED)
  )

  const sendRefereeEmail = (email) => {
    if (!isEmail(email)) {
      setError(true)
      return
    }
    setError(false)
    sendReferralEmail({ params: { email } })
    toggleEdit(!edit)
  }

  const onCancel = () => {
    setError(false)
    toggleEdit(!edit)
  }

  const showErrorToast = () => {
    dispatch(notificationActions.updateToast(referralErrorToast('error')))
  }
  const showSucceedToast = () => {
    dispatch(notificationActions.updateToast(referralToast('success')))
  }

  useEffect(() => {
    if (hasStatus(ASYNC_STATUS_ID.CONFIRMED)) showSucceedToast()
    if (hasStatus(ASYNC_STATUS_ID.ERROR)) showErrorToast()
  }, [referralEmailState.status.id])

  return (
    <Container>
      <Header> Referral link </Header>
      <FormWrap>
        <SingleContentToggle
          toggle={edit}
          trueContent={<ReferralForm onSaveClick={sendRefereeEmail} onCancel={onCancel} isError={error} />}
          falseContent={
            <Button onClick={() => toggleEdit(!edit)}>
              <ContentSwitcherByState
                activeState={referralEmailState.status.id}
                stateObject={{
                  [ASYNC_STATUS_ID.CONFIRMED]: <ConfirmedTick collection='general' name='tick' masking />,
                  [ASYNC_STATUS_ID.ERROR]: 'Retry',
                  default: (
                    <SingleDataLoader loading={hasStatus(ASYNC_STATUS_ID.PENDING)} data={'Send link via email'} />
                  )
                }}
              />
            </Button>
          }
        />
        <UserRank>
          <NumberOfParticipants>
            The number of participants is
            <strong>
              <SingleDataLoader
                loading={hasReferralStatus(ASYNC_STATUS_ID.PENDING)}
                data={referralData?.numberOfParticipants}
              />
            </strong>
          </NumberOfParticipants>
        </UserRank>
      </FormWrap>
    </Container>
  )
}

const Container = styled.div`
  justify-content: flex-start;
  align-items: flex-start;
  flex-flow: column;
  display: flex;
  width: 100%;
  margin: 0 0 15px 0;
`
const Header = styled.div`
  display: flex;
  font-size: 0.9rem;
  font-weight: 600;
  min-height: 30px;
  text-transform: uppercase;
  white-space: nowrap;

  ${({ theme }) => theme.breakPoints['768px']} {
    width: 100%;
    justify-content: center;
  }
`
const FormWrap = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  min-height: 55px;
  ${({ theme }) => theme.breakPoints['768px']} {
    flex-flow: column;
    align-items: center;
  }
`
const Button = styled.button`
  display: flex;
  border-radius: 10px;
  background: rgba(29, 75, 175, 1);
  padding: 12px 32px;
  line-height: 100%;
  margin-right: 6px;
  width: 198px;
  height: 45px;
  white-space: nowrap;
  font-size: 1rem;
  outline: none;
  border: none;
  text-decoration: none;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  justify-content: center;
  align-items: center;
  color: #fff;
`
const UserRank = styled.div`
  flex-flow: column;
  margin: 0 0 0 15px;
  font-size: 0.9rem;
  display: flex;

  ${({ theme }) => theme.breakPoints['768px']} {
    margin: 15px 0 0 15px;
  }
`
const NumberOfParticipants = styled.span`
  display: flex;
  align-items: center;

  & strong {
    font-weight: 600;
    display: inline;
    padding: 0 0 0 4px;
  }
`
const ConfirmedTick = styled(IconLib)`
  height: 1.2rem;
`
