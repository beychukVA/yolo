import styled, { css } from 'styled-components'

const aboutCSSPage = css`
  /*! CSS Used from: http://yolo.tino.me/www/resources/css/styles.css */
  /* * {
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    padding: 0;
    margin: 0;
    text-rendering: optimizeLegibility;
    line-height: 140%;
    font-weight: 400;
    color: #fff;
  } */
  a {
    color: #fff;
    text-decoration: underline;
    text-decoration-color: rgba(255, 255, 255, 0.4);
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
  }
  a:hover {
    text-decoration: none;
  }
  ul {
    list-style: none;
  }
  .content {
    position: relative;
    padding: 60px 10%;
    width: 100%;
    margin: 0 auto;
    z-index: 2;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }
  #about-page .content {
    align-items: flex-start;
  }
  .content .heading {
    font-size: 1.4rem;
    font-weight: 400;
    padding: 0 0 30px 0;
  }
  #about-page .content .heading {
    font-size: 2.7rem;
    letter-spacing: -0.04em;
    font-weight: 200;
    padding: 0 0 15px 0;
  }
  #about-page .content p {
    display: flex;
    justify-content: flex-start;
    text-align: left;
  }
  #about-page .content .heading_section {
    font-size: 1.5rem;
    font-weight: 600;
    text-align: left;
    padding: 30px 0 10px 0;
  }
  #about-page .team_wrapper {
    display: flex;
    justify-content: flex-start;
    flex-flow: row;
    width: 100%;
    flex-wrap: wrap;
    padding: 20px 0;
  }
  #about-page .team_wrapper .team {
    width: 300px;
    min-height: 110px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    padding: 20px;
    margin: 0 10px 10px 0;
    background: rgba(255, 255, 255, 0.05);
  }
  #about-page .team_wrapper .team:hover {
    background: rgba(42, 109, 255, 0.1);
  }
  #about-page .team_wrapper .team li {
    display: flex;
    flex-flow: column;
    flex-wrap: wrap;
    font-weight: 200;
  }
  #about-page .team_wrapper .team .name {
    font-weight: 500;
    font-size: 0.9rem;
  }
  #about-page .team_wrapper .team .name span {
    font-weight: 600;
    font-size: 1.2rem;
    padding: 0 0 5px 0;
  }
  #about-page .partnerships_wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 15px 0 0 0;
    flex-flow: row;
    flex-wrap: wrap;
  }
  #about-page .partnerships_wrapper a {
    margin: 0 50px 20px 0;
  }
  #about-page a.polygon_logo img {
    width: 190px;
  }
  #about-page a.galaxy_logo img {
    width: 330px;
  }
  #about-page a.ud_logo img {
    width: 220px;
  }
  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
    .overflow_container {
      height: 100vh;
      margin: 0;
      top: 5rem;
      width: 90vw;
    }
  }
  /*! CSS Used from: http://yolo.tino.me/www/resources/css/res.css */
  @media (max-width: 980px) {
    #main .content {
      padding-left: 30px;
      padding-right: 30px;
    }
    #about-page #main .content {
      padding: 30px;
    }
  }
  @media (max-width: 768px) {
    #about-page .team_wrapper .team {
      width: 100%;
      min-height: 110px;
      margin-right: 0;
    }
    #about-page .overflow_container {
      width: calc(100vw - 60px);
    }
  }
  @media (max-width: 480px) {
    #main .content {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
`
export const PageWrapper = styled.div`
  ${aboutCSSPage}
  overflow: auto;
`
