import styled from 'styled-components'

export const ContentSwitcherByState = ({ className, noWrapper, activeState, stateObject }) => {
  const activeKey = typeof activeState === 'number' ? activeState.toString() : activeState
  const switcher = Object.keys(stateObject).includes(activeKey) ? activeKey : 'default'
  return noWrapper ? (
    <> {stateObject[switcher]} </>
  ) : (
    <SwitcherContainer id='switcherContainer' className={className}>
      {stateObject[switcher]}
    </SwitcherContainer>
  )
}

const SwitcherContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: content-max;
`
