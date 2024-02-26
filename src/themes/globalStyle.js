import { icons } from 'common'
import { createGlobalStyle } from 'styled-components'
import { fontsCss } from './css/fontsCss'
import { keyframesCss } from './css/keyframes'
import { hintCss } from './css/hintCss'

export const GlobalStyle = createGlobalStyle`

  --button-background: transparent;
  --button-color: rgba(255, 255, 255, 1);
  --wallet-dropdown-width: auto;
  --dropdown-background: rgba(255, 255, 255, 0.2);
  --dropdown-backdrop-filter: blur(40px);
  --dropdown-color: rgba(255, 255, 255, 1);
  --dropdown-width: 370px;
  --hamburger-color: rgba(255, 255, 255, 1);
  --hamburger-arrow-position-right: 15px;
  --wallet-color: rgba(255, 255, 255, 1);

* {
  box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    padding: 0;
    margin: 0;
    text-rendering: optimizeLegibility;
    line-height: 140%;
    font-weight: 400;
    color: #fff;
    /* transition: all 0.5s; */
}
  body {
    font-size: 13px;
  }
    ul,
  li {
    list-style: none;
  }
  
  /* button {
    outline: none;
    border: none;
    background: linear-gradient(
      180deg,
      #2159d1,
      #2159d0,
      #2158cf,
      #2057cd,
      #2056ca,
      #1f55c7,
      #1f53c3,
      #1e52c0,
      #1e51bd,
      #1d50bb,
      #1d4fba,
      #1d4fb9
    );
    text-decoration: none;
    cursor: pointer;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 100%;
    border-radius: 10px;
  }
  button:hover {
    background: hsl(221, 73%, 47%);
  } */

  /* @media screen and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
    ::-webkit-scrollbar {
      width: 7px;
      height: 7px;
      opacity: 0;
    }
    *:hover ::-webkit-scrollbar {
      opacity: 1;
    }
    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-track-piece {
      background-color: transparent;
      border-radius: 20px;
      opacity: 0;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgba(21, 26, 34, 0.4);
      border-radius: 20px;
    }
    ::-webkit-scrollbar-corner {
      background: rgba(0, 0, 0, 0);
    }
  } */

  @media screen and (-webkit-min-device-pixel-ratio:0)
and (min-resolution:.001dpcm) {
	::-webkit-scrollbar {
		width: 4px;
		height: 4px;
		}
	*:hover ::-webkit-scrollbar {
		opacity: 1;
		}
	::-webkit-scrollbar-track,
	::-webkit-scrollbar-track-piece  {
		background-color: transparent;
		border-radius: 20px;
		opacity: 0;
		}
	::-webkit-scrollbar-thumb,
	::-webkit-scrollbar-thumb:vertical,
	::-webkit-scrollbar-thumb:horizontal {
		background-color: hsla(0,0%,100%,.5);
		border-radius: 20px;
		}
	::-webkit-scrollbar-corner {
   	background: rgba(0,0,0,0);
		}	
	}
@-moz-document url-prefix() {
	::-webkit-scrollbar {
		width: 4px;
		height: 4px;
		}
	*:hover ::-webkit-scrollbar {
		opacity: 1;
		}
	::-webkit-scrollbar-track,
	::-webkit-scrollbar-track-piece  {
		background-color: transparent;
		border-radius: 20px;
		opacity: 0;
		}
	::-webkit-scrollbar-thumb,
	::-webkit-scrollbar-thumb:vertical,
	::-webkit-scrollbar-thumb:horizontal {
		background-color: hsla(0,0%,100%,.5);
		border-radius: 20px;
		}
	::-webkit-scrollbar-corner {
   	background: rgba(0,0,0,0);
		}		
	}	
  
  .info_asset_icon {
    background: hsla(0,0%,100%,.1) url(${icons.info_icon}) center center / auto 10px no-repeat;
    padding: 10px;
    margin: 0 5px ;
    border-radius: 6px;
    display: flex;
    width: fit-content;
    height: fit-content;
}
  .info_tooltip_icon {
    background: hsla(0,0%,100%,.1) url(${icons.info_icon}) center center / auto 10px no-repeat;
    padding: 10px;
    margin: 0 0 0 0;
    border-radius: 6px;
    display: flex;
    width: fit-content;
    height: fit-content;
}
  
  ${hintCss}
  ${fontsCss}
  ${keyframesCss}
`
