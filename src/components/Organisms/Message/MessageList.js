import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import uuid from 'react-uuid'

import { MSG_TYPE } from 'constants/index'

import 'react-perfect-scrollbar/dist/css/styles.css'
import { ActivityItem } from './ActivityItem'
import { MessageItem } from './MessageItem'
import { memoThis } from 'utils/react'
import ms from 'ms.macro'

const INTERVAL_TIMEOUT = ms`60s`

export const MessageList = memoThis(({ isOpen, messages, address }) => {
  const listRef = useRef(null)
  const interval = useRef(null)
  const [firstOpen, setFirstOpen] = useState(true)

  const startScroll = (delay) => {
    if (!interval.current) {
      interval.current = setInterval(() => listRef?.current?.lastElementChild?.scrollIntoView(true), delay)
    }
  }

  const stopScroll = () => {
    if (interval.current) {
      clearInterval(interval.current)
      interval.current = null
    }
  }

  useEffect(() => {
    if (isOpen) {
      stopScroll()
      setTimeout(() => {
        startScroll(100)
        setTimeout(() => {
          stopScroll()
        }, 500)
      }, 500)
    }
  }, [isOpen])

  useEffect(() => {
    if (!firstOpen && messages[messages.length - 1].address === address) {
      stopScroll()
      setTimeout(() => {
        startScroll(100)
        setTimeout(() => {
          stopScroll()
          startScroll(INTERVAL_TIMEOUT)
        }, 500)
      }, 500)
    }
  }, [address, firstOpen, messages])

  useEffect(() => {
    setTimeout(() => {
      startScroll(1000)
      setTimeout(() => {
        stopScroll()
        setFirstOpen(false)
        startScroll(INTERVAL_TIMEOUT)
      }, 2000)
    }, 1500)
    return () => stopScroll()
  }, [])

  return (
    <Container ref={listRef} onMouseEnter={() => stopScroll()} onMouseLeave={() => startScroll(INTERVAL_TIMEOUT)}>
      {messages.map((msg, index) =>
        msg.messageType === MSG_TYPE.USER ? (
          <MessageItem
            key={msg.messageId}
            data={msg}
            isSelfMsg={msg.address === address}
            isNewMsg={index === 0 ? true : messages[index].address !== messages[index - 1].address}
          />
        ) : (
          msg.messageType === MSG_TYPE.ACTIVITY && <ActivityItem key={msg.messageId} data={msg} />
        )
      )}
      <span key={`message-item-${messages.length + 1}`} style={{ height: '1px' }}></span>
    </Container>
  )
})

const Container = styled.div`
  height: 100%;
`
