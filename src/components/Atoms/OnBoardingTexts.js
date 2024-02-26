import styled from 'styled-components'

export const OnBoardingIntro = styled.div`
  font-size: 1.1rem;
	padding: 0 0 10px 0;
	font-weight: 200;
	}
`
export const OnBoardingTitle = styled.div`
  font-size: 1.05rem;
  font-weight: 600;
`
export const OnBoardingP = styled.p`
  font-size: 0.85rem;
  line-height: 150%;
  padding: 10px 0;
  font-weight: 300;
  strong {
    font-weight: 600;
    font-size: 1rem;
  }
  ${({ theme }) => theme.breakPoints['480px']} {
    line-height: 140%;
    ont-size: 0.8rem;
    padding: 5px 0;
    font-weight: 300;
  }
`
