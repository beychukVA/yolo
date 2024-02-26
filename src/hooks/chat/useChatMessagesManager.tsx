import axios from 'axios'
import { config } from 'config'
import { API } from 'constants/apiEndPoints'
import { MSG_TYPE } from 'constants/index'
import { useReactGA4 } from 'GA4/useReactGA4'
import { useUser } from 'hooks/user/useUser'
import { isObject } from 'lodash'
import ms from 'ms.macro'
import { useCallback, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useIntervalWhen } from 'utils/hooks/useIntervalWhen'

type MessageBody = {
  text: string
  media: []
}

type RawMessage = {
  messageId?: string
  messageType: string
  address: string
  message: string
  timestamp: string
  username: string
  avatar: string
  xft_level?: string
}

type ParsedMessage = {
  messageId?: string
  messageType: string
  address: string
  message: MessageBody
  timestamp: string
  username: string
  avatar: string
  xft_level?: string
}

const socket = io(config.YOLO_API_BASE_URL, {
  transports: ['websocket'],
  withCredentials: true
})

const parseMessage = (rawMessage: RawMessage): ParsedMessage => {
  let message
  try {
    message = JSON.parse(rawMessage.message)
  } catch (err) {
    message = {
      text: rawMessage.message,
      media: []
    }
  }
  return { ...rawMessage, message, messageType: MSG_TYPE.USER }
}

export const useChatMessagesManager = () => {
  const { account } = useUser('wallet')
  const { username, avatar } = useUser('profile')
  const { gaEvent } = useReactGA4()

  const [messages, setMsgs] = useState<ParsedMessage[]>([])
  const [newMessage, setNewMessage] = useState<ParsedMessage | null>(null)

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Chat connected')
    })

    socket.on('message', (msg) => {
      const parsedMessage = parseMessage(msg)
      setNewMessage(parsedMessage)
    })

    socket.on('disconnect', () => {
      console.log('chat socket disconnected')
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [])

  useEffect(() => {
    const addNewMsg = () => {
      if (newMessage === null || newMessage.address === account) {
        return
      }
      setMsgs((prev) => [...prev, newMessage])
    }
    addNewMsg()
  }, [newMessage, account])

  const getMessages = useCallback(() => {
    axios
      .get(`${API.CHAT_MESSAGES}?count=50`)
      .then((res) => {
        const messageData = res.data.map((item: any, index: number) => {
          const parsedMessage = parseMessage(item)
          return parsedMessage
        })

        if (messageData.length !== 0) {
          const sortedArray = messageData.sort(function (a: RawMessage, b: RawMessage) {
            return +new Date(a.timestamp) - +new Date(b.timestamp)
          })
          setMsgs(sortedArray)
        }
      })
      .catch((err) => {
        console.log('message err:: ', err)
      })
  }, [])

  useIntervalWhen(getMessages, ms`5s`, navigator.onLine, true)

  const sendUserMessage = (userMessageObj: MessageBody) => {
    // if (!isObject(userMessageObj) || userMessageObj.text === '' || account === '') return
    if (!isObject(userMessageObj) || account === '') return

    try {
      const message = JSON.stringify(userMessageObj)
      const messageObj = {
        action: 'sendmessage',
        data: {
          address: account,
          message,
          timestamp: new Date().toISOString(),
          messageType: MSG_TYPE.USER
        }
      }
      setMsgs((prev) => [...prev, { ...messageObj.data, message: userMessageObj, username, avatar }])
      socket.emit('message', messageObj)
      gaEvent('chat_send', { pathId: 'chat.send', messageContent: userMessageObj })
    } catch (err) {
      console.log('ACZ Stringify error::', err)
      return
    }
  }
  return { messages, sendUserMessage }
}
