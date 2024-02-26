const { css, default: styled } = require('styled-components')

const designerCSS = css`
  .error_bar {
    width: 100%;
    background: rgba(222, 14, 84, 0.2);
    border: 1px solid #de0e54;
    padding: 10px 30px;
    border-radius: 10px;
    text-align: center;
    justify-content: center;
    align-items: center;
    flex-flow: row;
    display: flex;
    margin: 30px 0 0 0;
    position: relative;
    font-size: 0.8rem;
  }
  .error_bar button {
    background: rgba(222, 14, 84, 0.4);
    border-radius: 10px;
    padding: 5px 10px;
    line-height: 100%;
    margin: 0 0 0 10px;
  }
  .success_bar {
    width: 100%;
    background: rgba(0, 194, 19, 0.2);
    border: 1px solid #00c213;
    padding: 10px 30px;
    border-radius: 10px;
    text-align: center;
    justify-content: center;
    align-items: center;
    flex-flow: row;
    display: flex;
    margin: 30px 0 0 0;
    position: relative;
    font-size: 0.8rem;
  }
  .success_bar strong {
    font-weight: 600;
    padding: 0 5px 0 0;
  }
`
export const VerifiedEmailBarCSS = styled.div`
  width: 100%;
  ${designerCSS}
`
