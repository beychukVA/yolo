import { landingAssets } from 'assets/landing'
import { useEffect } from 'react'
export const IntroduceSection = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = '../scripts/wobbly.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <>
      <div id='main'>
        <div className='content'>
          <div id='yolorekt-logo-home'>
            <img alt='' src={landingAssets.yolorekt_logo_welcome} />
          </div>

          <h1>
            <span className='blue'>Gamified</span> <span className='pink'>Social</span>{' '}
            <span className='white'>Price Prediction</span>
          </h1>
          <h2>
            Built entirely on the blockchain, YOLOrekt is an engaging, fun, social, and potentially lucrative way to bid
            on the future price of crypto. Earn game fees and YOLO rewards by providing in-game liquidity, and become a
            master at bidding above the Strike price.
          </h2>

          <div className='main_cta_area'>
            <a href='/game' className='btn-liquid' id='play_button'>
              <script src='resources/scripts/liquid_button.js'></script>
              <canvas width='300' height='150'></canvas>
            </a>
            <a href='/game/yoloxft' className='xft_sale_link'>
              Looking for the XFT sale?
            </a>
          </div>

          <div id='games_browser'>
            <div className='games_tiles_wrapper'>
              <div className='tesla_row games_row'>
                <a href='past_game-tesla.php?wallet=connected-poly' className='game past current yolo'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Payout</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>2.91X</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='game_status yolo rekt'>
                      <strong>Settled</strong>
                      <div className='amount'>ROUND 7</div>
                    </div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <div className='triangle up large'></div>
                      <div className='gs_data_wrap'>
                        <div className='time_icon'></div>
                        <div className='amount'>$312.67</div>
                      </div>
                    </div>
                  </div>
                </a>
                <div className='game next tesla'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>1:35</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>Bid in Round 8</div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>$2,003.40</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next tesla'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>4:35</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>Bid in Round 9</div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>$1,791.82</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next tesla'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>7:35</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>Bid in Round 10</div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>$967.91</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next tesla'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>10:35</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>Bid in Round 11</div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>$1,844.27</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next tesla'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>13:35</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>Bid in Round 12</div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>$853.10</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next tesla'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>16:35</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>Bid in Round 13</div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>–</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next tesla'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>19:35</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>Bid in Round 14</div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>–</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next tesla'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>22:35</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>Bid in Round 15</div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>–</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next tesla'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>25:35</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>Bid in Round 16</div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>–</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next tesla'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>28:35</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>Bid in Round 17</div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>–</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next tesla'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>31:35</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>Bid in Round 18</div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>–</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next tesla'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>34:35</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>Bid in Round 19</div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>–</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='eth_row games_row'>
                <a className='game past yolo'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Payout</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>1.92X</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='game_status yolo'>
                      <strong>Settled</strong>
                      <div className='amount'>ROUND 2351</div>
                    </div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <div className='triangle up large'></div>
                      <div className='gs_data_wrap'>
                        <div className='time_icon'></div>
                        <div className='amount'>$121.64</div>
                      </div>
                    </div>
                  </div>
                </a>
                <a href='index.php?wallet=connected-poly' className='game live current'>
                  <div className='q1'>
                    <div className='block_time_wrap'>
                      <div id='real_time_value' className='test'>
                        0:15
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <strong>LIVE</strong> ROUND 2352
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <div className='triangle up large'></div>
                      <div className='gs_data_wrap'>
                        <div className='amount'>$131.48</div>
                      </div>
                    </div>
                  </div>
                </a>
                <a href='next_game.php?wallet=connected-poly' className='game next current'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>5:20</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>
                      Bid in<strong>Round 2353</strong>
                    </div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>$1,942.10</div>
                      </div>
                    </div>
                  </div>
                </a>
                <div className='game next'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>8:20</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>
                      Bid in <strong>Round 2354</strong>
                    </div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>$984.01</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>11:20</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>
                      Bid in <strong>Round 2355</strong>
                    </div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>$1,023.40</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>14:20</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>
                      Bid in <strong>Round 2356</strong>
                    </div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>$652.55</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>17:20</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>
                      Bid in <strong>Round 2357</strong>
                    </div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>–</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>20:20</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>
                      Bid in <strong>Round 2358</strong>
                    </div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>–</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>23:20</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>
                      Bid in <strong>Round 2359</strong>
                    </div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>–</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>26:20</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>
                      Bid in <strong>Round 2360</strong>
                    </div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>–</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>29:20</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>
                      Bid in <strong>Round 2361</strong>
                    </div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>–</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>32:20</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>
                      Bid in <strong>Round 2362</strong>
                    </div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>–</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>35:20</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>
                      Bid in <strong>Round 2363</strong>
                    </div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>–</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='matic_row games_row'>
                <a href='#' className='game past current yolo'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Payout</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>1.68X</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='game_status yolo'>
                      <strong>Settled</strong>
                      <div className='amount'>ROUND 10 </div>
                    </div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <div className='triangle up large'></div>
                      <div className='gs_data_wrap'>
                        <div className='time_icon'></div>
                        <div className='amount'>$197.58</div>
                      </div>
                    </div>
                  </div>
                </a>
                <div className='game next matic'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>1:30</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>bid in Round 11</div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>$841.03</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next matic'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>4:30</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>bid in Round 12</div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>$841.03</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next matic'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>7:30</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>bid in Round 13</div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>$1,200.03</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next matic'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>10:30</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>bid in Round 14</div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>$1,402.61</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next matic'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>13:30</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>bid in Round 15</div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>$874.21</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next matic'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>16:30</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>bid in Round 16</div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>–</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next matic'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>19:30</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>bid in Round 17</div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>–</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next matic'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>22:30</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>bid in Round 18</div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>–</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next matic'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>25:30</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>bid in Round 19</div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>–</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next matic'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>28:30</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>bid in Round 20</div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>–</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next matic'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>31:30</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>bid in Round 21</div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>–</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='game next matic'>
                  <div className='q1'>
                    <div className='game_status'>
                      <strong>Starts in</strong>
                      <div className='gametime'>
                        <div className='game_block_value'>34:30</div>
                      </div>
                    </div>
                  </div>
                  <div className='q2'>
                    <div className='predict_now'>bid in Round 22</div>
                  </div>
                  <div className='q3'>
                    <div className='game_status'>
                      <strong>Pool</strong>
                      <div className='gs_data_wrap'>
                        <div className='amount'>–</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
