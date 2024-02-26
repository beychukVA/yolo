import { IconLib } from 'components/Atoms/IconLib'
import styled, { css } from 'styled-components'
import { Dropdown } from 'components/Atoms/Dropdown'

const you = css`
  .you {
    background: hsla(255, 255%, 255%, 0.06);
    text-shadow: 0 0 10px rgb(255 255 255 / 10%), 0 0 10px rgb(255 255 255 / 10%), 0 0 10px rgb(42 109 255 / 30%),
      0 0 10px rgb(42 109 255 / 30%), 0 0 10px rgb(42 109 255 / 30%), 0 0 10px rgb(42 109 255 / 30%),
      0 0 10px rgb(42 109 255 / 30%);
  }
`

const youText = css`
  .you {
    text-shadow: 0 0 10px rgb(255 255 255 / 10%), 0 0 10px rgb(255 255 255 / 10%), 0 0 10px rgb(42 109 255 / 30%),
      0 0 10px rgb(42 109 255 / 30%), 0 0 10px rgb(42 109 255 / 30%), 0 0 10px rgb(42 109 255 / 30%),
      0 0 10px rgb(42 109 255 / 30%);
  }
`

const selectedTab = css`
  .selectedTab {
    background: rgba(255, 255, 255, 0.05);
    font-weight: 600;
    margin-left: -1px;
    color: #b3cbff;
    text-shadow: 0 0 10px rgb(42 109 255);
  }
`

const selectedHeaderCell = css`
  .selectedHeaderCell {
    border-top: 1px solid hsla(221, 73%, 47%, 0.5);
    color: hsl(214, 5%, 80%);
  }
`

const alignRight = css`
  .alignRight {
    justify-content: flex-end;
  }
`

const cellMobile = css`
  .cellMobile {
    min-height: 41px;
  }
  /* ${you} */
  ${youText}
`

const transparentCell = css`
  .transparent {
    background: transparent;
    color: transparent;
    min-height: 24px;
  }
`

const scroll = css`
  //   ::-webkit-scrollbar {
  //     width: 7px;
  //     opacity: 0;
  //   }
  //   *:hover ::-webkit-scrollbar {
  //     opacity: 1;
  //   }
  //   ::-webkit-scrollbar-track,
  //   ::-webkit-scrollbar-track-piece {
  //     background-color: transparent;
  //     border-radius: 20px;
  //     opacity: 0;
  //   }
  //   ::-webkit-scrollbar-thumb {
  //     background-color: rgba(21, 26, 34, 0.4);
  //     border-radius: 20px;
  //   }
`

export const CrownIcon = styled(IconLib).attrs({
  collection: 'general',
  name: 'leaderCrown'
})`
  width: 17px;
  height: 16px;
  margin: 0 8px 0 0;
  /* ${({ theme }) => theme.breakPoints['1024px']} {
    margin: 0 0 0 8px;
  } */
`

export const DollarIcon = styled(IconLib).attrs({
  collection: 'crypto',
  name: 'usdc'
})`
  width: 16px;
  height: 16px;
  /* ${({ theme }) => theme.breakPoints['1024px']} {
    margin: 0 3px 0 0px;
  } */
`
export const DollarWrapper = styled.div`
  background: #2775ca;
  border-radius: 50%;
  margin-left: 5px;
`

export const AwardStar = styled(IconLib).attrs({
  collection: 'general',
  name: 'awardStar',
  masking: true
})`
  background: ${({ ranking }) => (ranking < 2 ? '#ccc' : '#985400')};
  width: 18px;
  height: 16px;
  margin: 0 8px 0 0;
  /* ${({ theme }) => theme.breakPoints['1024px']} {
    margin: 0 5px 0 0px;
  } */
`

export const LeaderWrapper = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 550px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 28px 0 0 0;
  ${({ theme }) => theme.breakPoints['1024px']} {
    padding: 5px 0 0 0;
    height: 100%;
    margin: 40px 0;
  }
`

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  position: relative;
  z-index: 0;
  background: rgba(0, 0, 0, 0.2);
  padding: 20px 30px 0 30px;
  border-radius: 10px 10px 0 0;
  height: 100%;
  margin: 20px 0 0 0;
`

export const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  ${({ theme }) => theme.breakPoints['1024px']} {
    flex-wrap: wrap;
  }

  ${selectedTab};
`

export const Tab = styled.label`
  cursor: pointer;
  padding: 10px 20px;
  margin: 0 2px;
  background: transparent;
  border-bottom: 0;
  display: inline-block;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;

  ${({ theme }) => theme.breakPoints['1024px']} {
    :not(:first-child) {
      margin-top: 10px;
    }
  }
`

export const TableContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin: 15px 0;
  height: 400px;
`
export const TableBody = styled.div`
  display: grid;
  grid-template-columns: 0.75fr 2fr 1fr 1fr 1fr 1fr;
  overflow: auto;
  width: 100%;
  ${scroll}

  ${({ theme }) => theme.breakPoints['1024px']} {
    display: flex;
  }
`
export const TableHeader = styled.div`
  display: contents;
  ${({ theme }) => theme.breakPoints['1024px']} {
    display: flex;
    flex-direction: column;
  }
  ${cellMobile}
  ${selectedHeaderCell}
  ${transparentCell}
`
export const TableContent = styled.div`
  display: contents;
  ${({ theme }) => theme.breakPoints['1024px']} {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  ${cellMobile}
  /* ${alignRight} */
  ${you}
  ${transparentCell}
`
export const HeaderCell = styled.label`
  position: sticky;
  top: 0%;
  font-size: 0.75rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
  border-top: 1px solid transparent;
  cursor: pointer;
  color: hsl(214, 5%, 30%);
  font-weight: 600;
  background: hsl(223, 17%, 8%);
  z-index: 1;
  text-align: left;
  padding: 12px 10px 10px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:hover {
    border-top: 1px solid hsla(221, 73%, 47%, 0.5);
    color: hsl(214, 5%, 80%);

    div {
      opacity: 1;
    }
  }

  ${({ theme }) => theme.breakPoints['1024px']} {
    color: hsl(214, 5%, 80%);
  }
`

export const CellWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const ContentCell = styled.label`
  z-index: 0;
  position: relative;
  padding: 12px 10px 10px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.8rem;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 500;

  ${({ theme }) => theme.breakPoints['1024px']} {
    width: 100%;
  }
`

export const TriangleButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  /* border-radius: 5px; */
  width: 17px;
  height: 17px;
  margin-left: 6px;
  opacity: ${({ opacity }) => (opacity ? 1 : 0.5)};
  transition: all 150ms ease;
  transform: rotate(0deg);

  transform: rotate(${({ rotateUp }) => (rotateUp ? '0deg' : '180deg')});

  ${({ theme }) => theme.breakPoints['1024px']} {
    display: none;
  }

  &::before {
    content: '';
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid white;
  }
`
export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 15px 0;
`

export const LeaderDropdown = styled(Dropdown)`
  display: none;
  ${({ theme }) => theme.breakPoints['1024px']} {
    display: flex;
  }
`

export const Error = styled.div`
  margin: 60px auto;
`
