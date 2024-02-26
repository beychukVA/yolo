import { Link } from 'components/Atoms/Link'
import styled from 'styled-components'
// export const MobileWIP = () => {
//   return <div style={{ position: 'fixed', top: '0', left: '0', background: 'red', width: '100%', height: '50%' }}></div>
// }

export const WIP3min = () => {
  return (
    <WIP3minStyled>
      <FeaturesBetaButton to='/game?gametype=G_LVG' className='futures_link'>
        <strong>FUTURE$</strong>
      </FeaturesBetaButton>
    </WIP3minStyled>
  )
}
const WIP3minStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: hsla(0, 0%, 0%, 0.5);
  width: 100%;
  height: 100%;
  z-index: 99999999;
  &:after {
    content: 'The 3-minute game is currently undergoing maintenance and will return soon. In the meantime, please enjoy our FUTURE$ game.';
    background: hsla(0, 0%, 0%, 0.8);
    padding: 20px 20px 80px 20px;
    border-radius: 20px;
    position: absolute;
    font-size: 1rem;
    text-align: center;
    top: 50%;
    left: 50%;
    max-width: 300px;
    transform: translate(-50%, -50%);
  }
  @media (max-width: 600px) {
    display: none;
  }
`
const FeaturesBetaButton = styled(Link)`
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 70%);
  display: flex;
  align-items: center;
  text-decoration: none;
  text-transform: uppercase;
  height: fit-content;
  width: fit-content;
  /* margin: 0 0 0 10px; */
  color: #d1d2d4;
  background: #5a1998;
  padding: 5px 10px;
  line-height: 100%;
  border-radius: 0.4em;
  font-size: 1.2rem;
  text-transform: none;
  white-space: nowrap;
  z-index: 99999999;

  &:hover {
    background: #6e1fba;
    color: #fff;
  }
  strong {
    font-weight: 800;
    padding: 0 4px 0 0;
  }
`
