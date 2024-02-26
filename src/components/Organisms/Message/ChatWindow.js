import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { icons } from 'common'
import { MessageList } from './MessageList'
import { memoThis } from 'utils/react'
import { useUser } from 'hooks/user/useUser'
import { useChatMessagesManager } from 'hooks/chat/useChatMessagesManager'
import { GiphyPopup } from './Giphy/GiphyPopup/GiphyPopup'
import { useImageUpload } from 'hooks/chat/useImageUpload'

export const ChatWindow = memoThis(({ isOpen }) => {
  const { messages, sendUserMessage } = useChatMessagesManager()
  const { account } = useUser('wallet')
  const [message, setMessage] = useState('')
  const [isOpenGiphyPopup, setOpenGiphyPopup] = useState(false)
  const { imageUrl, uploadImage } = useImageUpload()
  const [media, setMedia] = useState([])
  const [inputKey, setInputKey] = useState(0)
  const MAX_MEDIA_ITEMS = 3

  const windowRef = useRef(null)

  const addGif = (gif) => {
    if (media.length === MAX_MEDIA_ITEMS) {
      media.pop()
    }
    setMedia((prev) => [...prev, { type: 'image', url: `https://media.giphy.com/media/${gif.id}/giphy.gif` }])
  }

  const disabledChat = !account

  const handleSendUserMessage = () => {
    const MessageBody = {
      text: message,
      media: media
    }
    sendUserMessage(MessageBody)
    setMessage('')
    setMedia([])
  }

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      handleSendUserMessage()
    }
  }

  const removeGifs = (index) => setMedia((prev) => prev.filter((prevGif, prevIndex) => prevIndex !== index))

  const uploadImg = (e) => {
    const img = e.target.files[0]
    uploadImage(img)
  }

  useEffect(() => {
    if (imageUrl) {
      if (media.length === MAX_MEDIA_ITEMS) {
        media.pop()
      }
      setMedia((prev) => [...prev, { type: 'image', url: imageUrl }])
      setInputKey((prev) => (prev += 1))
    }
  }, [imageUrl])

  return (
    <Container isOpen={isOpen} ref={windowRef}>
      <MessageContent>
        {!!messages.length && <MessageList isOpen={isOpen} messages={messages} address={account} />}
      </MessageContent>
      <Composer>
        <ComposerArea>
          <GiphyPopup isOpen={isOpenGiphyPopup} close={setOpenGiphyPopup} addGiphy={addGif} />
          <DarkGreyPad selectedGif={media}>
            <textarea
              placeholder='Type your message'
              value={message}
              onKeyDown={onEnterPress}
              onChange={(e) => setMessage(e.target.value)}
              disabled={disabledChat}
              rows={3}
            />
            {media.length > 0 && (
              <GifsContainer>
                {media.map((gif, index) => (
                  <GifsPreview key={`gif-preview-${index}`} gif={gif.url} max={MAX_MEDIA_ITEMS}>
                    <RemoveGifWrapper>
                      <RemoveGif onClick={() => removeGifs(index)} />
                    </RemoveGifWrapper>
                  </GifsPreview>
                ))}
              </GifsContainer>
            )}
          </DarkGreyPad>
        </ComposerArea>
        <Controls>
          <Additions>
            {/* <AdditionButton icon={icons.chat_info_icon} disabled={disabledChat} /> */}
            <div
              className='info_tooltip_icon hint--rounded hint--medium hint--top-right'
              data-hint='RULES:&#10;•&nbsp;Behave yourself, no harassment or insults&#10;•&nbsp;No spam&#10;•&nbsp;Do not post anything illegal or inappropriate - or you will be banned'
            />

            <input
              key={`fi-${inputKey}`}
              accept='image/*'
              type='file'
              id='upload-chat-image'
              style={{ display: 'none' }}
              disabled={disabledChat}
              onChange={uploadImg}
            />
            <label htmlFor='upload-chat-image'>
              <AdditionButton icon={icons.image_icon} disabled={disabledChat} />
            </label>
            <AdditionButton
              icon={icons.chat_gifs_icon}
              disabled={disabledChat}
              onClick={() => {
                if (!disabledChat) {
                  setOpenGiphyPopup(!isOpenGiphyPopup)
                }
              }}
            />
          </Additions>
          <SendButton
            onClick={() => handleSendUserMessage()}
            disabled={disabledChat || message ? !message : media.length > 0 ? false : true}
          >
            Send
          </SendButton>
        </Controls>
      </Composer>
    </Container>
  )
})

const DarkGreyPad = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: fit-content;
  background: hsl(216, 18%, 11%);
  border-radius: 10px;
`

const GifsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  margin: 5px 0 20px -5px;
`

const GifsPreview = styled.div`
  position: relative;
  display: block;
  background-image: url(${({ gif }) => gif});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  flex-basis: calc(${({ max }) => `(100% / ${max < 3 ? 3 : max}) - 5px`});
  margin-left: 10px;
  height: 100%;
  min-height: 50px;
  border-radius: 5px;
`

const RemoveGifWrapper = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: black;
`
const RemoveGif = styled.div`
  width: 15px;
  height: 15px;
  -webkit-mask: url(${icons.close}) center center / 15px 15px no-repeat;
  mask: url(${icons.close}) center center / 15px 15px no-repeat;
  background: red;
  cursor: pointer;
  /* background-image: url(${icons.close}); */
  /* background-size: cover; */
  /* background-repeat: no-repeat; */
  /* background-position: center center; */
`

const Controls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 15px 0;
`
const Additions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90px;
`

const AdditionButton = styled.div`
  background-position: center center;
  background-size: auto 20px;
  background-repeat: no-repeat;
  width: 22px;
  height: 20px;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 0.6)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed !important' : 'pointer')};
  display: flex;
  background-image: url(${({ icon }) => icon});
  transition: all 0.5s;

  &:hover {
    opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  }
`
const Container = styled.div`
  min-width: 300px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background: transparent;
  border-radius: 10px;
  left: 0;
  position: relative;
  align-items: center;
  flex-direction: column;
  /* top: 15px; */

  padding-left: ${({ isOpen }) => (isOpen ? '15px' : '50px')};

  /* &:before {
    position: absolute;
    top: calc(50% + 7px);
    left: 0;
    background: linear-gradient(90deg, rgba(32, 37, 47, 0.8) 0%, rgba(32, 37, 47, 0.1) 100%);
    transform: translateY(-50%);
    content: '';
    height: 100%;
    width: 100%;
    z-index: 0;
  } */
  ${({ theme }) => theme.breakPoints['1200px']} {
    max-width: 100vw;
    margin: 0;
    border-radius: 0;
    overflow-x: hidden;

    &:before {
      display: none;
    }
  }
`
const MessageContent = styled.div`
  position: relative;
  overflow: auto;
  flex: 1;
  min-width: 100%;
  max-width: 100%;
  ${({ theme }) => theme.breakPoints['1200px']} {
    width: 100%;
    /* padding-bottom: 70px; */
  }
  ${({ theme }) => theme.breakPoints['xs']} {
    padding-bottom: 10px;
  }
`
const Composer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  width: 100%;
  padding: 20px 15px 0 0;
`
const ComposerArea = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & textarea {
    resize: none;
    width: 100%;
    padding: 10px 20px;
    margin: 5px 0;
    height: 36px;
    border-radius: 10px;
    background: hsl(216, 18%, 11%);
    line-height: 100%;
    outline: none;
    border: none;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed !important' : 'text')};
  }

  ${({ theme }) => theme.breakPoints['1200px']} {
    width: 100%;
    display: flex;
    align-items: center;
  }
`
const SendButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 100%;
  padding: 8px 15px;
  border-radius: 10px;
  margin-left: auto;
  outline: none;
  border: none;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed !important' : 'pointer')};
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
  -webkit-transition: all 0.3s;

  &:hover {
    background: ${({ disabled }) => (disabled ? '' : 'hsl(221, 73%, 47%)')};
  }
`
