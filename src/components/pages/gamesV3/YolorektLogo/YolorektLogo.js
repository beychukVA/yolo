import { icons } from 'common'
import styled, { css } from 'styled-components'

const designerCSS = css`
  width: 160px;
  height: 30px;
  margin: 2px 0 0 20px;
  background-image: url(${icons.YoloLogoWhiteIcon});
  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width: 1600px) {
    width: 160px;
  }

  @media (max-width: 800px) {
    margin-left: 10px;
    background: url(${icons.YoloTokenWhiteIcon}) center center / 35px auto no-repeat;
    width: 35px;
    margin: 2px 0 0 20px;
    height: 100%;
    display: block;
  }
`

export const YolorektLogo = styled.a`
  ${designerCSS}
`
