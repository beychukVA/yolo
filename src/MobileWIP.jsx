import styled from 'styled-components'
// export const MobileWIP = () => {
//   return <div style={{ position: 'fixed', top: '0', left: '0', background: 'red', width: '100%', height: '50%' }}></div>
// }

export const MobileWIP = styled.div`
  @media (max-width: 600px) {
    position: fixed;
    top: 0;
    left: 0;
    background: hsla(0, 0%, 0%, 0.5);
    width: 100%;
    height: 100%;
    z-index: 99999999;
    &:after {
      content: 'We’re currently working hard to bring you an optimized experience for mobile. Please check back again soon.';
      background: hsla(0, 0%, 0%, 0.8);
      padding: 20px;
      border-radius: 20px;
      position: absolute;
      font-size: 1rem;
      text-align: center;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`
