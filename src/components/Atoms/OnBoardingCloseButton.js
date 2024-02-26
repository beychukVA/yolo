import styled from 'styled-components'
import { IconLib } from './IconLib'

export const OnBoardingCloseButton = styled(IconLib).attrs({
  collection: 'general',
  name: 'closeOutline',
  masking: true
})`
  cursor: pointer;
  olor: #fff;
  font-size: 1.4rem;
  line-height: 100%;
  position: fixed;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 8px;
  text-align: center;
  text-decoration: none;
  top: 8px;
  z-index: 1;
`
