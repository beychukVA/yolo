import { icons } from 'common'
import { Link } from 'components/Atoms/Link'
import styled from 'styled-components'

export const DepositButton = () => {
  return <DepositBtn to='/game/wallet'>Deposit</DepositBtn>
}

const DepositBtn = styled(Link)`
  outline: none;
  border: none;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 34px;
  background: rgba(31, 57, 114, 0.8);
  padding: 0 32px 0 12px;
  line-height: 100%;
  border-radius: 10px;
  position: relative;
  font-size: 0.8rem;
  margin: 0 5px 0 0px;
  color: #fff;
  :hover {
    color: #fff;
    text-decoration: none;
  }
  :before {
    mask: url(${icons.usdc});
    background: #fff;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    content: '';
    width: 14px;
    height: 14px;
  }
`
