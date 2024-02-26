import { icons } from 'common'
import { IconLib } from 'components/Atoms/IconLib'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

export const BucketLevelIconWrapper = styled.div`
  .level_ind {
    border-radius: 50%;
    width: ${({ remSize }) => (remSize ? `${remSize + 0.3}rem` : '1rem')};
    height: ${({ remSize }) => (remSize ? `${remSize + 0.3}rem` : '1rem')};
    line-height: 0;
    font-size: ${({ remSize }) => (remSize ? `${remSize}rem` : '0.7rem')};
    font-weight: 600;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 6px 0 0;
    padding: 5px;
  }
  .level_ind.fifth {
    background: #0dbb21;
  }
  .level_ind.fourth {
    background: #3ba055;
  }
  .level_ind.third {
    background: #698688;
  }
  .level_ind.second {
    background: #a54976;
  }
  .level_ind.first {
    background: #ca1c5a;
  }
`
