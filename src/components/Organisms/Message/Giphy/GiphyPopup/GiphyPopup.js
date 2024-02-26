import { icons } from 'common'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { useClickOutside } from 'utils/hooks'
import { GridContainer } from '../Grid/GridContainer'

const tabs = [
  {
    id: 1,
    name: 'GIFs',
    type: 'gifs'
  },
  {
    id: 2,
    name: 'Stickers',
    type: 'stickers'
  },
  {
    id: 3,
    name: 'Text',
    type: 'text'
  },
  {
    id: 4,
    name: 'Emoji',
    type: 'emoji'
  }
]

export const GiphyPopup = ({ isOpen, close, addGiphy }) => {
  //   useClickOutside(popupRef, () => close(false))
  const popupRef = useRef()
  const [filter, setFilter] = useState('')
  const [currTab, setCurrTab] = useState(tabs[0])

  const handleGifClick = (gif, e) => {
    e.preventDefault()
    addGiphy(gif)
    close(false)
  }

  return (
    <Container ref={popupRef} isOpen={isOpen}>
      <SearchContainer>
        <Search type='text' placeholder='Search GIPHY' onChange={(e) => setFilter(e.target.value)} value={filter} />
        <SearcButtonContainer>
          <SearchIcon />
        </SearcButtonContainer>
      </SearchContainer>
      <ScrollContainer>
        <GridContainer currTab={currTab} onGifClick={handleGifClick} filter={filter} />
      </ScrollContainer>
      <TabsContainer>
        {tabs?.map((tab) => (
          <Tab key={tab.id} currTab={currTab.name === tab.name} onClick={() => setCurrTab(tab)}>
            {tab.name}
          </Tab>
        ))}
      </TabsContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: absolute;
  left: 0;
  bottom: calc(100% + 8px);
  overflow: hidden;
  border-radius: 10px;
  padding: ${({ isOpen }) => (isOpen ? '10px' : '0px')};
  background-color: #000;
  height: ${({ isOpen }) => (isOpen ? '450px' : '0px')};
  transform: translateY(${({ isOpen }) => (isOpen ? 100 : 0)});
  width: 100%;
  transition: all 250ms linear;
`

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 5px;
`

const Search = styled.input`
  width: 100%;
  height: 30px;
  color: #000;
  padding: 0 5px 0 5px;
  outline: none;
`

const SearcButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: linear-gradient(45deg, rgb(153, 51, 255) 0%, rgb(255, 102, 102) 100%);
  /* border-radius: 4px; */
  overflow: hidden;
`
const SearchIcon = styled.div`
  display: flex;
  width: 15px;
  height: 15px;
  background-image: url(${icons.search_icon});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  transform: rotate(90deg);
`
const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
const Tab = styled.span`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ currTab }) => (currTab ? 'lightgreen' : 'gray')};

  padding: 10px 10px 0 10px;
  cursor: pointer;
  transition: all 250ms ease;

  &:hover {
    color: ${({ currTab }) => (currTab ? 'lightgreen' : 'lightgray')};
  }
`
