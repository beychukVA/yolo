import { landingAssets } from 'assets/landing'
import { LiveGraph } from './LiveGraph'

export const Level2 = () => {
  return (
    <>
      <div id='level_2'>
        <div className='content'>
          <div className='live_area' style={{ zIndex: 2 }}>
            <h4>
              Make money by predicting the price of <strong>ETH</strong>, <strong>Tesla</strong>, <strong>Matic</strong>
              , <strong>Bitcoin</strong>, <strong>GameStop</strong> and more
            </h4>
            <div className='game_type live'>LIVE</div>
          </div>
          <LiveGraph />

          <div className='app_experiences'>
            <h4>The Pro and Mobile Experiences</h4>
            <h5>Lots of money to be won - lots of fun to be had</h5>
            <div className='tpe'>
              <img alt='' src={landingAssets.tpe_lp} />
            </div>
            <div className='tme'>
              <img alt='' src={landingAssets.tme_lp} />
            </div>
          </div>

          <h4>Bid in any round, at any time, as many times as you'd like</h4>

          <div className='bidding_feature'>
            <ul className='bidding_feature_callouts'>
              <li className='callout one'>
                Bid quickly and easily from a centralized interface. Never miss the action
                <div className='callout_arrow '></div>
              </li>
              <li className='callout two'>
                Quickly bid using preset bidding amounts, or type in your own
                <div className='callout_arrow '></div>
              </li>
              <li className='callout three'>
                If you change your mind and want to bid in another round, select the round here
                <div className='callout_arrow '></div>
              </li>
              <li className='callout four'>
                Bid smarter by knowing what the payouts and odds are
                <div className='callout_arrow '></div>
              </li>
            </ul>
            <div id='place_bid' className='modaloverlay place_bid-wrapper'>
              <div className='modal'>
                <div className='modal_window_wrapper'>
                  <div className='window_heading bid_up'>
                    <div className='title'>
                      Bid in
                      <div className='round_number'>
                        <span>Round</span>
                        <div className='round'>
                          9
                          <div className='selection_icon'>
                            <div className='triangle down'></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <form className='bid_form'>
                    <fieldset>
                      <label htmlFor='input_bid_entry'>Bid amount</label>
                      <div className='input_wrap'>
                        <input
                          type='text'
                          id='input_bid_entry'
                          placeholder='50.00'
                          className='amount'
                          onInput={() => null}
                          maxLength='9'
                          value=''
                        />
                        <div className='amount_suggestions'>
                          <a href='#null'>15.00</a>
                          <a href='#null'>25.00</a>
                          <a href='#null'>50.00</a>
                        </div>
                      </div>
                      <div className='currency_wrap'>
                        <div className='usd_icon'></div>
                        USD
                      </div>
                    </fieldset>
                    <div className='bid_balance_remainder'>
                      <div className='ab'>
                        Balance<strong>$15,461.33</strong>
                      </div>
                    </div>
                    <fieldset className='button_row'>
                      <div className='bid_button_modal_wrap down'>
                        <button onClick={() => null} className='place_bid-down'>
                          Bid down
                        </button>
                        <div className='pg'>
                          <strong>Payout</strong> $159.07 <span className='payout'>1.64X</span>
                        </div>
                      </div>
                      <div className='bid_button_modal_wrap up'>
                        <button onClick={() => null} className='place_bid-up'>
                          Bid up
                        </button>
                        <div className='pg'>
                          <strong>Payout</strong> $159.07 <span className='payout'>1.64X</span>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
