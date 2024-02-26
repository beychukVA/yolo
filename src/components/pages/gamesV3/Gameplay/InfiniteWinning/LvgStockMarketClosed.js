import { STOCK_MARKET_TIME } from 'constants/assets'
import styled from 'styled-components'
export const LvgStockMarketClosed = () => {
  return (
    <TextPad>
      <Title>Stocks are currently closed for trading.</Title>
      {`The markets are open Monday to Friday from ${STOCK_MARKET_TIME.openTimeUtc} UTC to ${STOCK_MARKET_TIME.closeTimeUtc} UTC.`}
    </TextPad>
  )
}

const TextPad = styled.div`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.3rem;
  font-weight: 500;
  text-align: ${({ rLoading }) => (rLoading ? 'left' : 'center')};
  background: rgba(50, 50, 50, 0.5);
  backdrop-filter: blur(10px);
  z-index: 2;
  font-weight: 700;
  padding: 20px 40px;
  /* line-height: 100%; */
  border-radius: 20px;
  margin: 20px 0;
  width: 370px;

  ${({ theme }) => theme.breakPoints['1200px']} {
    top: 40%;
  }
  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: 1rem;
    margin: 20px 0;
    padding: 20px 10px;
    width: 300px;
  }
`
const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  padding: 20px 0;
  /* line-height: 100%; */
  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: 1.4rem;
    padding: 20px 10px;
  }
`
