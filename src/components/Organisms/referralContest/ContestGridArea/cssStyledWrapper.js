import styled, { css } from 'styled-components'

const level22 = css`
  /*! CSS Used from: http://yolo.tino.me/game-omega-staging/resources/css/styles.css */
  /* @media screen and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
    ::-webkit-scrollbar {
      width: 7px;
      opacity: 0;
    }
    *:hover ::-webkit-scrollbar {
      opacity: 1;
    }
    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-track-piece {
      background-color: transparent;
      border-radius: 20px;
      opacity: 0;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgba(21, 26, 34, 0.4);
      border-radius: 20px;
    }
  } */
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
  /*! CSS Used from: http://yolo.tino.me/game-omega-staging/resources/css/dashboard.css */
  #my-dashboard-grid {
    width: 100%;
    margin: 20px 0 0 0;
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  .level2_2 .box {
    padding: 4px 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-transform: uppercase;
    line-height: 100%;
    white-space: nowrap;
  }
  #my-dashboard-grid .header_1 {
    font-size: 0.9rem;
    font-weight: 600;
    padding: 0;
    min-height: 30px;
  }
  #my-dashboard-grid .data_1_1,
  #my-dashboard-grid .data_label {
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
  }
  #my-dashboard-grid .data_label {
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
  }
  #my-dashboard-grid .data_1_1.rewards {
    color: #2a6dff;
  }
  #my-dashboard-grid .data_1_2.rewards_unharvested {
    color: #2a6dff;
    font-size: 1.2rem;
  }
  #my-dashboard-grid .data_1_2 {
    padding: 0 14px;
    font-size: 1rem;
    font-weight: 700;
    text-align: right;
    justify-content: flex-end;
    min-height: 24px;
  }
  #my-dashboard-grid .data_label_2 {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    font-size: 0.7rem;
    line-height: 110%;
    color: rgba(255, 255, 255, 0.6);
    text-align: left;
    justify-content: flex-start;
    padding: 0 20px 0 0;
    min-height: 24px;
  }
  .level2_2 {
    display: grid;
    grid-template-columns: 0.25fr 1fr 0.25fr 1fr;
    grid-template-areas: 'label0 label0 label0 label0' 'label1 label6 label6 label6' 'spacer_3 spacer_3 spacer_3 spacer_3' 'label8 label9 label10 label11' 'spacer_4 spacer_4 spacer_4 spacer_4' 'label12 label13 label14 label15' 'label16 label17 label18 label19' 'spacer_1 spacer_1 spacer_1 spacer_1' 'spacer_2 spacer_2 spacer_2 spacer_2' 'label3 label3 label3 label3' 'label4 label4 label4 label4' 'spacer_5 spacer_5 spacer_5 spacer_5' 'label5 label7 label7 label7' 'spacer_6 spacer_6 spacer_6 spacer_6' 'label20 label21 label21 label21';
    width: calc(50% - 10px);
    gap: 0px;
  }
  #my-dashboard-grid .level2_2 #spacer_7,
  #my-dashboard-grid .level2_2 #spacer_8 {
    display: none;
  }
  .level2_2 #item-0 {
    grid-area: label0;
  }
  .level2_2 #item-1 {
    grid-area: label1;
  }
  .level2_2 #spacer_3 {
    grid-area: spacer_3;
  }
  .level2_2 #spacer_4 {
    grid-area: spacer_4;
  }
  .level2_2 #spacer_6 {
    grid-area: spacer_6;
  }
  .level2_2 #spacer_7 {
    grid-area: spacer_7;
  }
  .level2_2 #spacer_8 {
    grid-area: spacer_8;
  }
  .level2_2 #item-3 {
    grid-area: label3;
  }
  .level2_2 #item-5 {
    grid-area: label5;
  }
  .level2_2 #item-6 {
    grid-area: label6;
  }
  .level2_2 #item-7 {
    grid-area: label7;
  }
  .level2_2 #item-20 {
    grid-area: label20;
  }
  .level2_2 #item-21 {
    grid-area: label21;
  }
  /*! CSS Used from: http://yolo.tino.me/game-omega-staging/resources/css/contest.css */
  .level2_2 .box {
    white-space: normal;
  }
  .header_1 {
    font-size: 0.9rem;
    font-weight: 600;
    min-height: 30px;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .data_label_total {
    font-size: 1.6rem;
    font-weight: 200;
  }
  .slash_divider {
    font-size: 1.6rem;
    font-weight: 100;
    margin-right: 10px;
    display: inline-block;
  }
  .yolo_currency_ind {
    font-size: 0.9rem;
    font-weight: 200;
    margin: 0 0 0 10px;
  }
  .level2_2 {
    width: 100%;
  }
  /*! CSS Used from: http://yolo.tino.me/game-omega-staging/resources/css/res.css */
  @media (max-width: 1200px) {
    #my-dashboard-grid .level2_2 .data_label_2 {
      font-size: 0.6rem;
    }
  }
  @media (max-width: 980px) {
    #my-dashboard-grid {
      flex-direction: column;
    }
    #my-dashboard-grid .level2_2 {
      width: 100%;
    }
  }
  @media (max-width: 768px) {
    .level2_2 {
      grid-template-columns: 0.15fr 1fr;
      grid-template-areas: 'label0 label0' 'label1 label6' 'spacer_3 spacer_3' 'label8 label9' 'spacer_7 spacer_7' 'label12 label13' 'label16 label17' 'spacer_8 spacer_8' 'label10 label11' 'spacer_4 spacer_4' 'label14 label15' 'label18 label19' 'spacer_1 spacer_1' 'spacer_2 spacer_2' 'label3 label3' 'label4 label4' 'spacer_5 spacer_5' 'label5 label7' 'spacer_6 spacer_6' 'label20 label21';
    }
    #my-dashboard-grid .level2_2 #spacer_7,
    #my-dashboard-grid .level2_2 #spacer_8 {
      display: flex;
    }
    #my-dashboard-grid .level2_2 .data_label_2 {
      white-space: normal;
      line-height: 120%;
      flex-wrap: wrap;
    }
    #my-dashboard-grid .data_1_2.rewards_unharvested {
      align-items: flex-start;
    }
  }
`

export const Level22Wrapper = styled.div`
  width: 100%;
  ${level22}
`
