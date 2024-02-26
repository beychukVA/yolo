import styled from 'styled-components'

import { IconLib } from 'components/Atoms/IconLib'

export const AllGamesHeader = ({ closeMenu }) => {
  return (
    <ShowLiveRound>
      <AllGamesButton>Choose up to 3 markets to display</AllGamesButton>
    </ShowLiveRound>
  )
}

const ShowLiveRound = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`
const AllGamesButton = styled.div`
  padding: 15px 20px;
  display: flex;
  color: #fff;
  transition: all 0.3s;
  text-decoration: none;
  height: 100%;
  font-weight: 600;
`
const IconCube = styled(IconLib).attrs({
  collection: 'crypto',
  name: 'cube',
  dimension: '16px'
})`
  margin: 0 10px 0 0;
`
