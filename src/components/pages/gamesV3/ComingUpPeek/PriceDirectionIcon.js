import { icons } from 'common'
import styled, { css } from 'styled-components'

const designerCSS = css`
  -webkit-mask: url(${icons.direction_arrow_icon}) center center / 10px 10px no-repeat;
  margin: 1px 5px 0 0;
  z-index: 1;
  position: relative;
  width: 10px;
  height: 10px;
`

const devCSS = css`
  background: ${({ arrow }) => (arrow ? 'rgb(0, 194, 19)' : 'rgb(222, 14, 84)')};
  transform: rotate(${({ arrow }) => (arrow ? '0deg' : '180deg')});
`

export const PriceDirectionIcon = styled.div`
  ${designerCSS}
  ${devCSS}
`
