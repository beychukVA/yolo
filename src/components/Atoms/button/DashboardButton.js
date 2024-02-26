import styled from 'styled-components'

export const DashboardButton = styled.button`
  outline: none;
  border: none;
  text-decoration: none;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 160%;
  border-radius: 10px;
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  margin: 0 2px;
  background: rgba(29, 75, 175, 1);
  color: #fff;

  &:hover {
    background: rgba(42, 109, 255, 1);
  }

  &:selected {
    background: rgba(42, 109, 255, 1);
    cursor: default;
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
