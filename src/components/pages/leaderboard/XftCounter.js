import styled, { css } from 'styled-components'
import { FlipCounter } from 'components/Atoms/FlipCounter'
import { useXftMinted } from 'hooks/xftCampaign/useXftMinted'

const counterCss = css`
  background: rgba(0, 0, 0, 1);
`

const AvailableCss = css`
  background: rgba(20, 27, 41, 1);
`

export const XftCounter = ({ className }) => {
  const { campaignLimit, claimCounter } = useXftMinted()

  return (
    <Container className={className}>
      <Header> YOLO XFT AVAILABILITY </Header>
      <TimeList>
        <li>
          <FlipCounter digit={claimCounter.toNumber().toLocaleString()} flipNumberCSS={counterCss} />
          <TimeDescription>Claimed</TimeDescription>
        </li>
        <li>
          <FlipCounter digit={campaignLimit.toNumber().toLocaleString()} flipNumberCSS={AvailableCss} />
          <TimeDescription>Total Available</TimeDescription>
        </li>
      </TimeList>
    </Container>
  )
}

const Container = styled.div`
  margin: 40px 0;
  flex-flow: column;
  align-items: center;
  display: flex;
  width: 100%;
`
const Header = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  min-height: 30px;
  text-transform: uppercase;
  line-height: 100%;
  white-space: nowrap;
`
const TimeList = styled.ul`
  display: flex;

  & li {
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    display: flex;
  }
`
const TimeDescription = styled.p`
  display: flex;
  text-transform: capitalize;
  font-size: 0.75rem;
  margin: 5px 0 0 0;
`
