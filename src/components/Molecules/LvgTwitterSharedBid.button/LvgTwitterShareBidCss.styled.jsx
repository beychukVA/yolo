import { icons } from 'common'
import styled, { css } from 'styled-components'

const designerCSS = css`
  .twitter_card_share-toast {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
  .twitter_card_share-toast div {
    border-radius: 0.8em;
    padding: 10px 14px 10px 34px;
    line-height: 100%;
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    background: linear-gradient(0deg, #0a74b4, #0d7abd, #1081c5, #1387ce, #158dd7, #1894e0, #1a9ae9, #1ca1f2);
    position: relative;
    color: #fff;
  }
  .twitter_card_share-toast div:before {
    -webkit-mask: url(${icons.twitter_icon}) center center / 12px auto no-repeat;
    background: #fff;
    width: 14px;
    height: 14px;
    position: absolute;
    content: '';
    top: 50%;
    transform: translateY(-50%);
    left: 12px;
  }
`

const DesignerIconVariant = css`
  .twitter_card_share-toast {
  }
  .twitter_card_share-toast div {
    padding: 0;
    height: 24px;
    width: 28px;
    border-radius: 8px;
    background: linear-gradient(
      0deg,
      hsla(203, 85%, 39%, 0.4),
      hsla(203, 84%, 41%, 0.4),
      hsla(203, 82%, 43%, 0.4),
      hsla(203, 81%, 45%, 0.4),
      hsla(203, 80%, 47%, 0.4),
      hsla(203, 79%, 49%, 0.4),
      hsla(203, 82%, 51%, 0.4),
      hsla(203, 88%, 53%, 0.4)
    );
  }

  .twitter_card_share-toast div:before {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const developerCSS = css`
  .twitter_card_share-toast {
    ${({ fromToast }) => (fromToast ? ' margin-top: 12px' : '')};
  }
  .disable {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const LvgTwitterShareBidCss = styled.div`
  ${designerCSS}
  ${developerCSS} 
  ${({ variant }) =>
    ({
      icon: DesignerIconVariant
    }[variant])}
`
