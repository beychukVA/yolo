import styled, { css } from 'styled-components'

export const Box = styled.div`
  padding: 4px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-transform: uppercase;
  line-height: 100%;
  white-space: nowrap;
`
export const Header1 = css`
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0;
  min-height: 30px;
  text-transform: uppercase;
`
export const Data11 = css`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding: 14px 14px;
  font-size: 1.6rem;
  font-weight: 400;
  min-height: 58px;
  text-align: right;
  justify-content: flex-end;
`
export const Data12 = css`
  padding: 0 14px;
  font-size: 1rem;
  font-weight: 700;
  text-align: right;
  justify-content: flex-end;
  min-height: 24px;
`
export const DataLabel = css`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding: 14px 14px;
  font-size: 1.6rem;
  font-weight: 400;
  min-height: 58px;
  text-align: right;
  justify-content: flex-end;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  padding-left: 0;
  text-align: left;
  justify-content: flex-start;
  line-height: 120%;

  ${({ theme }) => theme.breakPoints['768px']} {
    & br {
      display: none;
    }
  }
`
export const DataLabel2 = css`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  font-size: 0.7rem;
  line-height: 110%;
  color: rgba(255, 255, 255, 0.6);
  text-align: left;
  justify-content: flex-start;
  padding: 0 20px 0 0;
  min-height: 24px;

  & br {
    display: none;
  }

  ${({ theme }) => theme.breakPoints['980px']} {
    & br {
      display: flex;
    }
  }

  ${({ theme }) => theme.breakPoints['768px']} {
    white-space: normal;
    line-height: 120%;
    flex-wrap: wrap;

    & br {
      display: none;
    }
  }
`
