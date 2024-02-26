import styled, { css } from 'styled-components'

const next = css`
  background: linear-gradient(0deg, rgba(29, 75, 175, 1) 0%, rgba(42, 109, 255, 1) 100%);
`
const back = css`
  background: #636f8e;
`

export const OnBoardingButton = styled.button`
  cursor: pointer;
  border-radius: 15px;
  padding: 12px 24px;
  line-height: 100%;
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
  color: white;
  ${({ variant }) =>
    ({
      next,
      back
    }[variant || 'next'])}
`

export const OnBoardingButtonsRow = styled.div`
  width: 100%;
  justify-content: space-between;
  position: relative;
  margin: 20px 0 0 0;
  display: flex;
  flex-wrap: wrap;
`
