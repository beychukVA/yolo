import { ThemeProvider } from 'styled-components'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { generateName } from 'utils'
import { icons } from 'common'
import { useUser } from 'hooks/user/useUser'
import { useMessageFormatter } from './utils/messageFormatter'
/**
 * Data Object Props:
 *  {
 *    address: "0xe5b9f95828c0fa62e4d733717921fb5d6d7b4b6f"
 *    username: 'username'
 *    xft_level: '0'
 *    message: "Hi, from my local"
 *    messageId: "ac18ce07-da97-47c3-bb83-08d47cae74ef"
 *    messageType: "USER"
 *  }
 */

export const MessageItem = ({ data, isSelfMsg, isNewMsg }) => {
  const refMessage = useRef(null)
  const username = data.username || generateName()
  const { avatar } = useUser('profile')
  const userAvatar = isSelfMsg ? avatar : data.avatar
  const { mentionFormatter } = useMessageFormatter()
  const extendedTheme = (theme) => ({
    ...theme,
    isSelfMsg
  })

  useEffect(() => {
    mentionFormatter(data.message.text, refMessage.current)
  }, [data.message, mentionFormatter, refMessage])

  return (
    <ThemeProvider theme={extendedTheme}>
      <Container>
        <UserAvatarContainer>
          <Avatar avatar={userAvatar} />
        </UserAvatarContainer>
        <MessageContentContainer>
          <UserName>{username}</UserName>&nbsp;
          <Message>
            <Text
              onClick={(e) => {
                if (e.target.id.includes('@')) {
                  console.log('click: ', e.target.id)
                }
              }}
              ref={refMessage}
            ></Text>
            {data.message.media &&
              data.message.media.map((media, index) => (
                <Media key={`media-${index}`}>
                  <img src={media.url} alt='' />
                </Media>
              ))}
          </Message>
        </MessageContentContainer>
      </Container>
    </ThemeProvider>
  )
}

const Media = styled.div`
  margin: 10px 0 0 0;
  display: inline-block;
  width: 100%;

  & img {
    width: calc(100% + 40px);
    margin-left: -35px;
    /* margin-top: 5px; */
  }
`

const Text = styled.div``

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  /* background-color: ${({ theme }) => (theme.isSelfMsg ? 'rgba(0, 0, 0, .25)' : 'hsla(215, 0%, 0%, 0.15)')}; */
  background-color: hsla(215, 0%, 0%, 0.15);
  padding: 12px 12px 11px 12px;
  height: fit-content;
  border-radius: 10px;
  margin: 0 15px 8px 0;
`
const UserAvatarContainer = styled.div``
const Avatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 7px;
  background-image: url(${({ avatar }) => avatar || icons.default_avatar_square});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
`
const MessageContentContainer = styled.div`
  display: inline;
  text-align: left;
  line-height: 160%;
  width: calc(100% - 38px);
  word-wrap: break-word;
  font-size: 0.75rem;
  /* margin: ${({ theme }) => (!theme.isSelfMsg ? '0 0 0 10px' : '0 14px 0 0')}; */
  margin: 0 0 0 10px;
`

const UserName = styled.span`
  font-weight: 600;
  margin: 0 0 0 0;
  border-bottom: 1px dotted hsla(0, 0%, 100%, 0.4);
  text-decoration: none;
`

const Message = styled.span`
  font-weight: 400;

  & .gif_image {
    margin: 10px 0 0 0;
    display: inline-block;
    width: 100%;
  }

  & .gif_image img {
    width: 100%;
  }
`
const Mention = styled.span`
  font-weight: 600;
  margin: 0 3px 0 3px;
  color: hsl(221, 100%, 58%);
  border-bottom: 1px dotted hsla(221, 100%, 58%, 0.6);
  text-decoration: none;
  cursor: pointer;
`
