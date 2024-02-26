import { icons } from 'common'
import { WalletConnect } from 'components/Molecules/WalletManager/WalletConnect'
import { useRef } from 'react'
import styled from 'styled-components'
import { useClickOutside } from 'utils/hooks'
import { ProfileDropdown } from './ProfileDropdown'
import { ProfileName } from './ProfileName'
import { useUser } from 'hooks/user/useUser'
import { ProfileAvatar } from 'components/Atoms/ProfileAvatar'

export const Profile = ({ isOpen, isOpenDropdown, closeMenu, toggleDropdown }) => {
  const { account } = useUser('wallet')
  const { username, avatar } = useUser('profile')
  const dropdownMenuRef = useRef()
  useClickOutside(dropdownMenuRef, () => {
    if (isOpenDropdown) {
      closeMenu()
    }
  })

  return account ? (
    <Wrapper>
      <ProfileContainer onClick={() => toggleDropdown()}>
        <ProfileAvatar avatar={avatar} />
        <ProfileName isOpen={isOpen}>{username}</ProfileName>
        <MenuSelect isOpen={isOpen} isOpenDropdown={isOpenDropdown} />
      </ProfileContainer>
      <ProfileDropdown ref={dropdownMenuRef} isOpenDropdown={isOpenDropdown} closeMenu={closeMenu} />
    </Wrapper>
  ) : isOpen ? (
    <WalletConnect />
  ) : (
    <>
      <ProfileAvatar avatar={avatar} />
    </>
  )
}

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`

const MenuSelect = styled.div`
  width: 18px;
  height: 18px;
  margin: 0 5px 0 10px;
  background: rgba(0, 0, 0, 0.2) url(${icons.arrow_up}) center 4px / auto 9px no-repeat;
  filter: invert(1);
  border-radius: 3px;
  cursor: pointer;
  transition: all 150ms ease-in;
  transform: rotate(${({ isOpenDropdown }) => (isOpenDropdown ? '0deg' : '-180deg')});
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`
