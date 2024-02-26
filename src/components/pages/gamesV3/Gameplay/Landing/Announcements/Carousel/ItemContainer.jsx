import styled from 'styled-components'

export const ItemContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 100%;
  max-width: 100%;
  background-image: url(${({ bg }) => bg});
  background-repeat: no-repeat;
  background-size: 100%;
  height: 225px; //calc(100% - 25px);
  border-radius: 10px;
  padding: 30px 60px;

  :nth-child(1) {
    background-size: cover;
    background-position: center center;
  }

  :nth-child(2) {
    background-size: 200% 300%;
    background-position: 0 -100px;
  }

  @media (max-width: 1200px) {
    padding: 30px 30px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 20px;
    justify-content: center;
    height: 225px; //calc(100% - 25px);
    /* background-repeat: no-repeat;
    background-size: 100%; */
  }
`
