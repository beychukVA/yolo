import { icons } from 'common'
import styled, { css } from 'styled-components'

const designerCSS = css`
  width: auto;
  height: 14px;
  width: 14px;
  margin: 0 5px 0 0;
  background-image: url(${icons.matic_icon});
  background-repeat: no-repeat;
  background-size: contain;
`

export const ComingUpIcon = styled.div`
  ${designerCSS}
`
