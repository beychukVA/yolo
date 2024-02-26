import { css } from 'styled-components'
import { addOpacityToHexColor } from 'themes/themeUtils'

/* prettier-ignore */
const PALETTE = {
  WHITE:                '#FFFFFF',
  PERANO:               '#95B7FF',
  ROYAL_BLUE:           '#2A6DFF',
  NEON_BLUE:            '#2151FF',
  EGYPTIAN_BLUE:        '#163F97',
  SAPPHIRE:             '#192F60',
  BLACK:                '#000000',
  BLACK_RUSSIAN:        '#0E1117',
  BLACK_RUSSIAN_LIGHT:  '#21242C',
  ECLIPSE:              '#3A3A3A',
  EBONY:                '#2C2F37',
  KELLY_GREEN:          '#4AAE24',
  CARDIN_GREEN:         '#17352A',
  SPEECH_GREEN:         '#00c213',
  SANGRIA:              '#770809',
  PERSIAN_ROSE:         '#EA35A2',
  SANTOS_GREY:          '#99999B',
  MANATEE:              '#848790',
  JAZZBERRY_JAM:        '#AF0450',
  LIGHT_SKY_BLUE:       '#8AC0FF',
  FESTIVAL:             '#E5C247',
  RAZZMATAZZ:           '#DE0E54',
  
}

const BG_GRADIENTS = {
  bearAndBull: css`
    background-image: ;
  `
}

export const STEEL_MOON_COLORS = {
  bgGradients: BG_GRADIENTS,
  white: PALETTE.WHITE,
  black: PALETTE.BLACK,
  error: PALETTE.RAZZMATAZZ,
  primary: PALETTE.ROYAL_BLUE,
  primaryHover: PALETTE.SAPPHIRE,
  secondary: PALETTE.WHITE,
  tertiary: PALETTE.EBONY,
  green: PALETTE.KELLY_GREEN,
  darkGreen: PALETTE.CARDIN_GREEN,
  lightGreen: PALETTE.SPEECH_GREEN,
  grey: PALETTE.SANTOS_GREY,
  lightSky: PALETTE.LIGHT_SKY_BLUE,
  manatee: PALETTE.MANATEE,
  betDown: PALETTE.SANGRIA,
  jamRed: PALETTE.JAZZBERRY_JAM,
  textPrimary: PALETTE.WHITE,
  textSecondary: PALETTE.ROYAL_BLUE,
  hoverableText: PALETTE.PERANO,
  backgroundPrimary: PALETTE.BLACK_RUSSIAN,
  backgroundSecondary: PALETTE.BLACK_RUSSIAN_LIGHT,
  backgroundTertiary: PALETTE.EBONY,
  backgroundLandingButton: PALETTE.EGYPTIAN_BLUE,
  backdrop: addOpacityToHexColor(PALETTE.BLACK_RUSSIAN, 65),
  videoOverlay: addOpacityToHexColor(PALETTE.BLACK_RUSSIAN, 65),
  priceGraphScale: PALETTE.MANATEE,
  priceGraphStrike: PALETTE.ROYAL_BLUE,
  priceGraphStrikeGradient: `linear-gradient(to left, rgba(42, 109, 255, 0) 0%, ${PALETTE.ROYAL_BLUE} 100%)`,
  priceGraphGlowUp: PALETTE.SPEECH_GREEN,
  priceGraphGlowDown: PALETTE.RAZZMATAZZ,
  priceGraphUp: addOpacityToHexColor(PALETTE.SPEECH_GREEN, 90),
  priceGraphBarUp: addOpacityToHexColor(PALETTE.SPEECH_GREEN, 50),
  priceGraphUpGradient: `linear-gradient(to right, rgba(42, 109, 255, 0) 0%, ${PALETTE.SPEECH_GREEN} 100%)`,
  priceGraphDown: addOpacityToHexColor(PALETTE.RAZZMATAZZ, 90),
  priceGraphBarDown: addOpacityToHexColor(PALETTE.RAZZMATAZZ, 50),
  priceGraphDownGradient: `linear-gradient(to right, rgba(42, 109, 255, 0) 0%, ${PALETTE.RAZZMATAZZ} 100%)`,
  padBackgroundPrimary: PALETTE.WHITE,
  padBackgroundSecondary: PALETTE.BLACK,
  txConfirmed: PALETTE.ROYAL_BLUE,
  txPending: PALETTE.FESTIVAL,
  txFailed: PALETTE.JAZZBERRY_JAM,
  bullAndBearGradient: 'linear-gradient(to right, rgba(0, 66, 154, 1) 0%, rgba(167, 64, 181, 1) 100%)'
}
