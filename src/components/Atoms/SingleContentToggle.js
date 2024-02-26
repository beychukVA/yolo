import styled from 'styled-components'

export const SingleContentToggle = ({ className, toggle, trueContent, falseContent, noWrapper }) => {
  return noWrapper ? (
    <> {toggle ? trueContent : falseContent}</>
  ) : (
    <ToggleContainer id='toggleContainer' className={className}>
      {toggle ? trueContent : falseContent}
    </ToggleContainer>
  )
}

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: content-max;
`
