import { icons, images } from 'common'
import styled, { css } from 'styled-components'

const designerCSS = css`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background-image: url(${({ avatar }) => avatar});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;

  @media (max-width: 800px) {
    display: none;
  }
`

export const ProfileAvatar = styled.div`
  ${designerCSS}
`
