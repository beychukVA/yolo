import styled from 'styled-components'
import { Link } from 'components/Atoms/Link'

export const HeaderDropdownItemBody = ({ menuItems }) => {
  return (
    <StyledMenu>
      {menuItems.map((item, index) => (
        <MenuItem key={index} to={item.to} onClick={item.onClick}>
          {item.label}
        </MenuItem>
      ))}
    </StyledMenu>
  )
}

const StyledMenu = styled.div`
  position: relative;
  margin: 10px 0 0 20px;
  padding: 15px 0;
  box-sizing: border-box;
  z-index: 4;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  list-style: none;
  color: rgba(255, 255, 255, 1);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  cursor: default;
  justify-content: flex-start;
  width: max-content;
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
    top: 0;
    left: 0;
    box-shadow: 10px 30px 35px 0px rgb(0 0 0 / 35%);
    z-index: -1;
    border-radius: 15px;
  }
`
const MenuItem = styled(Link)`
  text-decoration: none;
  padding: 7px 24px;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.8rem;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${({ theme }) => theme.themeColors.white};
  }
`
