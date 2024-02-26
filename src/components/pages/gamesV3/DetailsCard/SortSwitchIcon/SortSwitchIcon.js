import { icons } from 'common'
import styled, { css } from 'styled-components'

const designerCSS = css`
  width: 18px;
  height: 18px;
  background: rgba(0, 0, 0, 0.2) url(${icons.swap_direction_icon}) center center / auto 9px no-repeat;
  filter: invert(1);
  border-radius: 3px;
  margin: 0 0 0 5px;
  line-height: 100%;
`

export const SortSwitchIcon = styled.div`
  ${designerCSS}
`
