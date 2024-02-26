import React from 'react'
import styled from 'styled-components'
import { Link } from 'components/Atoms/Link'

const DepositButton = () => {
  return <Button to='/game/wallet'>Deposit</Button>
}

export default DepositButton

const Button = styled(Link)`
  padding: 8px 16px;
  line-height: 100%;
  border-radius: 10px;
  font-size: 0.8rem;
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
`
