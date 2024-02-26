import styled, { css } from 'styled-components'
import { Typography } from 'components/Atoms/Typography'

const DirectionLabel = ['up', 'down']

export const PredictButton = ({ disabled, color, isUp = false, onClick, className }) => {
  return (
    <Button
      id={`predict${isUp ? 'Up' : 'Down'}`}
      isUp={isUp}
      onClick={(e) => !disabled && onClick(e)}
      className={className}
      disabled={disabled}
    >
      <ButtonText size='1.1' weight='500' spacing='-.01'>
        Bid {DirectionLabel[isUp ? 0 : 1]}
      </ButtonText>
    </Button>
  )
}

const upStyle = css`
  background-image: linear-gradient(
    -90deg,
    rgba(0, 135, 13, 1) 0%,
    rgba(0, 113, 11, 1) 30%,
    rgba(0, 96, 9, 1) 50%,
    rgba(0, 82, 8, 1) 80%,
    rgba(51, 56, 67, 1) 100%
  );
  margin-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`
const downStyle = css`
  background-image: linear-gradient(
    -90deg,
    rgba(51, 56, 67, 1) 0%,
    rgba(104, 0, 35, 1) 30%,
    rgba(119, 7, 45, 1) 50%,
    rgba(150, 9, 57, 1) 80%,
    rgba(175, 11, 66, 1) 100%
  );
  margin-right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`

const Button = styled.button`
  text-align: center;
  width: 50%;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 14px 0;
  position: relative;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')} !important;
  opacity: ${({ disabled }) => (disabled ? 0.4 : '')};
  ${({ isUp }) => (isUp ? upStyle : downStyle)};
  ${({ theme }) => theme.breakPoints['md']} {
    height: 40px;
  }
  ${({ theme }) => theme.breakPoints['xs']} {
    height: auto;
  }
`
const ButtonText = styled(Typography)`
  ${({ theme }) => theme.breakPoints['md']} {
    font-size: 1rem;
  }
`
