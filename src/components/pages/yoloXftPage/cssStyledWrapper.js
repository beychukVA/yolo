import styled, { css } from 'styled-components'

const pageCssBase = css`
  * {
    color: #fff;
  }
  #page_wrapper {
    overflow: auto;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
  }
  #main {
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1 1 auto;
    z-index: 2;
    overflow-y: hidden;
  }
  .content {
    height: calc(100% + 15px);
    height: 100%;
    transition: width 300ms ease-in-out;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    color: #fff;
    padding: 15px 0 0 0;
    overflow: auto;
  }
  @media (max-width: 480px) {
    #main {
      padding: 0;
    }
    .content {
      padding: 8px 0 0 0;
    }
  }
  @media (max-width: 375px) {
    footer .user_icon {
      display: none;
    }
  }
`
const xftPageCssV2Announce = css`
  #xft-page {
  }
  #xft-page:before,
  #xft-page:after {
    display: none;
  }

  #default-page .content,
  #xft-page .content {
    justify-content: flex-start;
    align-items: flex-start;
    padding: 60px;
    overflow-y: auto;
    overflow-x: hidden;
    margin-bottom: 30px;
    position: relative;
  }
  #default-page h1,
  #xft-page h1 {
    font-size: 2rem;
    font-weight: 200;
    letter-spacing: -0.03em;
    line-height: 100%;
    padding: 0 0 5px 0;
  }
  #xft-page h1.hiw {
    font-size: 2.5rem;
    font-weight: 200;
    letter-spacing: -0.04em;
    line-height: 100%;
    padding: 0;
  }
  #default-page h2,
  #xft-page h2 {
    font-size: 0.9rem;
    font-weight: 300;
  }
  #default-page h2 strong,
  #xft-page h2 strong {
    font-weight: 600;
  }
  #default-page .content form.action_buttons,
  #xft-page .content form.action_buttons {
    position: absolute;
    right: 60px;
    top: 75px;
    z-index: 99999;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  #default-page .content button.stake,
  #xft-page .content button.stake {
    background: linear-gradient(0deg, rgba(29, 75, 175, 1) 0%, rgba(42, 109, 255, 1) 100%);
    border-radius: 10px;
    padding: 8px 10px;
  }
  #xft-page .content {
    align-items: center;
  }
  #xft-page header *,
  #xft-page .countdown_container * {
    display: flex;
  }
  #xft-page header {
    display: flex;
    justify-content: center;
    width: 100%;
    position: relative;
  }
  #xft-page header .page_info {
    position: absolute;
    top: 0;
    left: 0;
    flex-flow: column;
  }
  #xft-page header .page_info h1 {
    font-size: 1.3rem;
    font-weight: 600;
  }
  #xft-page header .page_info h2 {
    font-size: 0.9rem;
    font-weight: 300;
  }
  .yolorekt_logo_stacked_fff {
    justify-content: center;
    width: 400px;
  }
  .yolorekt_logo_stacked_fff img {
    width: 400px;
  }
  #xft-page .what_is_xft {
    font-size: 0.9rem;
    margin: 20px 0 0 0;
    padding: 5px 15px;
    line-height: 100%;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 6px;
  }

  #xft-page .headline {
    text-align: center;
    justify-content: center;
    font-size: 2.1rem;
    letter-spacing: -0.04em;
    font-weight: 100;
    padding: 30px 10% 10px 10%;
    line-height: 110%;
  }

  #xft-page .textblock {
    text-align: center;
    justify-content: center;
    font-size: 1.1rem;
    padding: 0 10%;
  }
  #xft-page .textblock.details {
  }
  #xft-page .textblock p {
    font-weight: 200;
    padding: 10px 0;
    line-height: 150%;
    font-size: 1rem;
  }
  #xft-page .textblock p a.galaxy {
    font-weight: 600;
  }
  #xft-page .dateblock {
    text-align: center;
    justify-content: center;
    font-size: 1.1rem;
    /* border-bottom: 1px solid rgba(255,255,255,.1); */
    width: calc(100% + 120px);
    padding: 40px 60px 20px 60px;
    margin: 15px 0 0 0;
    background: rgba(255, 255, 255, 0.05);
  }
  #xft-page .dateblock strong {
    font-size: 2.7rem;
    font-weight: 600;
    letter-spacing: -0.03em;
    padding: 0 0 10px 0;
    display: block;
    line-height: 100%;
  }
  #xft-page .dateblock p {
    font-weight: 200;
    padding: 0 0 5px 0;
    line-height: 150%;
  }
  #xft-page .comp_links {
    display: flex;
    flex-flow: column;
    justify-content: center;
    margin: 0 0 15px 0;
  }
  #xft-page .comp_links a {
    padding: 0 0 10px 0;
    display: block;
    font-weight: 600;
    font-size: 1.1rem;
  }

  #xft-page .ctablock {
    text-align: center;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    /* border-bottom: 1px solid rgba(255,255,255,.1); */
    width: calc(100% + 120px);
    padding: 40px 60px 40px 60px;
    margin: 30px 0 0 0;
    background: rgba(255, 255, 255, 0.05);
    display: flex;
    flex-flow: column;
  }
  #xft-page .ctablock strong {
    font-size: 1.7rem;
    font-weight: 600;
    letter-spacing: -0.03em;
    padding: 0 0 10px 0;
    display: block;
    line-height: 100%;
  }
  #xft-page .ctablock p {
    font-weight: 200;
    padding: 0 0 5px 0;
    line-height: 150%;
  }
  #xft-page button.mint {
    background: #0088bb;
    border: 2px solid rgba(255, 255, 255, 0.3);
    font-size: 2.2rem;
    padding: 20px 44px;
    line-height: 100%;
    border-radius: 30px;
    margin: 0;
    font-weight: 600;
    -webkit-box-shadow: 0px 0px 65px -1px rgba(23, 27, 34, 0.4);
    box-shadow: 0px 0px 65px -1px rgba(23, 27, 34, 0.4);
    position: relative;
    z-index: 1;
  }
  #xft-page button.mint[disabled] {
    background: #186892;
    color: #98a5b6;
    cursor: not-allowed;
  }
  #xft-page button.mint:hover[disabled] {
    background: #186892;
    color: #98a5b6;
  }
  #xft-page button.mint:hover {
    background: #00aef0;
  }
  #xft-page .mint_status {
    border-radius: 15px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding: 50px 10px 10px 10px;
    margin: -40px 0 0 0;
    line-height: 100%;
    position: relative;
    z-index: 0;
    font-size: 0.9rem;
    font-weight: 600;
  }
  #xft-page form.minted .mint_status {
    background: rgba(80, 207, 255, 0.1);
    border: 1px solid rgba(80, 207, 255, 0.7);
    color: #50cfff;
  }
  #xft-page form.ineligible .mint_status {
    background: rgba(222, 14, 84, 0.1);
    border: 1px solid rgba(222, 14, 84, 0.7);
    color: #de0e54;
  }
  #xft-page form.ready .mint_status {
    background: rgba(0, 194, 19, 0.1);
    border: 1px solid rgba(0, 194, 19, 0.7);
    color: #00c213;
  }

  #xft-page .pg_steps {
    width: 100%;
    max-width: 600px;
    margin: 30px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
  }
  #xft-page .pg_steps img {
    width: 100%;
    max-width: 600px;
  }
  #xft-page .pg_steps .pg_steps_numbers {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 0 0 20px 0;
    max-width: 600px;
  }
  #xft-page .pg_steps .pg_steps_numbers span {
    width: 50%;
    font-size: 3.5rem;
    font-weight: 600;
  }

  #xft-page .countdown_container {
    margin: 0 0 0 0;
    padding: 0 0 40px 0;
    flex-flow: column;
    align-items: center;
    display: flex;
    width: calc(100% + 120px);
    background: rgba(255, 255, 255, 0.05);
  }
  #xft-page .countdown_container .header_1 {
    font-size: 0.9rem;
    font-weight: 600;
    min-height: 30px;
    text-transform: uppercase;
    line-height: 100%;
    white-space: nowrap;
  }
  #xft-page #countdown {
  }
  #xft-page #countdown li {
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
  }
  #xft-page #countdown .timenumbers {
    font-size: 2.4rem;
    line-height: 0;
    padding: 35px 15px;
    background: rgba(0, 0, 0, 1);
    border-radius: 10px;
    font-weight: 600;
    letter-spacing: -0.03em;
    width: 80px;
    text-align: center;
    justify-content: center;
  }
  #xft-page #countdown .timedescription {
    text-transform: capitalize;
    font-size: 0.75rem;
    margin: 5px 0 0 0;
  }
  #xft-page .plusdetails {
    text-align: center;
    align-items: center;
    width: 100%;
    font-size: 1.1rem;
    padding: 40px 60px 60px 60px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-top: 0;
    border-radius: 30px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    display: flex;
    flex-direction: column;
  }
  #xft-page .plusdetails h2,
  #xft-page .textblock h2 {
    font-size: 1.4rem;
    font-weight: 500;
    padding: 20px 0 0 0;
  }
  #xft-page .plusdetails p {
    font-weight: 200;
    padding: 10px 0;
    line-height: 160%;
    font-size: 0.9rem;
  }
  #xft-page .plusdetails strong {
    font-size: 1.2rem;
    font-weight: 600;
  }
  #xft-page .logos .plus {
    font-size: 3rem;
    font-weight: 600;
    line-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 25px 0 40px 0;
  }
  #xft-page .logos .yolorekt_logo_hor {
    width: 240px;
    display: flex;
    align-items: center;
  }
  #xft-page .logos .project_galaxy_logo_hor img {
    width: 60%;
    max-width: 650px;
    min-width: 400px;
  }
  #xft-page .logos .yolorekt_logo_hor img {
    width: 240px;
  }

  @media (max-width: 1200px) {
    #xft-page .pg_steps {
      width: 100%;
      margin: 30px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-flow: column;
    }
    #xft-page .pg_steps img {
      width: 100%;
      max-width: 1200px;
    }
    #xft-page .pg_steps .pg_steps_numbers {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-evenly;
      margin: 0 0 20px 0;
    }
    #xft-page .pg_steps .pg_steps_numbers span {
      width: 25%;
      font-size: 3.5rem;
      font-weight: 600;
    }
    #xft-page .plusdetails {
      padding: 40px 30px;
      border: 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 0;
    }
    #xft-page .textblock {
      padding: 0 30px;
    }
  }
  @media (max-width: 980px) {
    #xft-page .content {
      padding: 60px 30px;
    }
  }
  @media (max-width: 768px) {
    #xft-page .pg_steps .pg_steps_numbers span {
      font-size: 3rem;
      font-weight: 600;
    }
  }
  @media (max-width: 600px) {
    .yolorekt_logo_stacked_fff {
      justify-content: center;
      width: 100%;
    }
    .yolorekt_logo_stacked_fff img {
      width: 75%;
      min-width: 280px;
    }
    #xft-page .logos .yolorekt_logo_hor {
      width: 100%;
      display: flex;
      align-items: center;
    }
    #xft-page .logos .project_galaxy_logo_hor img {
      width: 100%;
      min-width: 340px;
    }
    #xft-page .content {
      padding: 30px 30px;
    }
    #xft-page .headline {
      padding: 20px 0 0 0;
    }
    #xft-page .textblock {
      padding: 0;
    }
    #xft-page .plusdetails {
      padding: 30px 0;
    }
    #xft-page .ctablock button.mint {
      background: #0088bb;
      /* border: 1px solid rgba(255,255,255,.3); */
      font-size: 1.6rem;
      padding: 15px 34px;
      border-radius: 25px;
    }
  }
  @media (max-width: 480px) {
    #xft-page #countdown .timenumbers {
      font-size: 1.9rem;
      width: 70px;
      padding: 30px 15px;
    }
    #xft-page .dateblock strong {
      font-size: 2.2rem;
      font-weight: 600;
      letter-spacing: -0.03em;
      padding: 0 0 10px 0;
      display: block;
      line-height: 100%;
    }
  }
`
export const Wrapper = styled.div`
  background: radial-gradient(
    circle at -10% -20%,
    #437499,
    #427297,
    #3e6b91,
    #396287,
    #33577c,
    #2c4a6f,
    #263e61,
    #1f3353,
    #1a2a47,
    #16223c,
    #131e36,
    #121c33
  );
  ${pageCssBase}
  ${xftPageCssV2Announce}
  overflow: auto;
`
