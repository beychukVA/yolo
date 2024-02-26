import { IconLib } from 'components/Atoms/IconLib'
import { Link } from 'components/Atoms/Link'
import styled from 'styled-components'

export const LinksSection = () => {
  return (
    <WalletLinks>
      <SectionLinks to='/game/wallet'>
        <IconLink collection='general' name='wallet' masking />
        Wallet
      </SectionLinks>
      <SectionLinks to='/game/bidder-dashboard'>
        <IconLink collection='general' name='userCircle' masking />
        Bidders Dashboard
      </SectionLinks>
      <SectionLinks to='/game/liquidity-dashboard'>
        <IconLink collection='general' name='lightning' masking />
        Liquidity Analytics
      </SectionLinks>
    </WalletLinks>
  )
}

const WalletLinks = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-flow: column;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin: 0 -15px;
  padding: 0 0 15px 0;
`
const SectionLinks = styled(Link)`
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 30px;
  width: 100%;
  font-weight: 500;
  font-size: 0.9rem;
  text-decoration: none;
  :hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
`
const IconLink = styled(IconLib)`
  background: #fff;
  width: 16px;
  height: 16px;
  margin: 0 10px 0 0;
`
