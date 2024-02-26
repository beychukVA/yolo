import { landingAssets } from 'assets/landing/index.js'

export const AccountSection = ({ className }) => {
  return (
    <>
      <div id='level_4' className='account'>
        <div className='content max shading'>
          <div className='features_wrapper'>
            <h4>
              YOLO XFTs
              <div className='normal'>
                Earn Rewards<div></div>
              </div>
            </h4>
            <p>The more you bid, the more rewards you earn</p>
            <div className='nft_feature'>
              <div className='silver1 silver cell right'>Silver</div>
              <div className='silver2 silver cell center'>
                <img alt='xft_silver' src={landingAssets.yolo_nft_silver_512} />
              </div>
              <div className='silver3 silver cell left'>Rewards 1.25X</div>
              <div className='orchid1 orchid cell right'>Orchid</div>
              <div className='orchid2 orchid cell center'>
                <img alt='xft_orchid' src={landingAssets.yolo_nft_orchid_512} />
              </div>
              <div className='orchid3 orchid cell left'>Rewards 1.5X</div>
              <div className='emerald1 emerald cell right'>Emerald</div>
              <div className='emerald2 emerald cell center'>
                <img alt='xft_emerald' src={landingAssets.yolo_nft_emerald_512} />
              </div>
              <div className='emerald3 emerald cell left'>Rewards 1.75X</div>
              <div className='gold1 gold cell right'>Gold</div>
              <div className='gold2 gold cell center'>
                <img alt='xft_gold' src={landingAssets.yolo_nft_gold_512} />
              </div>
              <div className='gold3 gold cell left'>Rewards 2X</div>
              <div className='ruby1 ruby cell right'>Ruby</div>
              <div className='ruby2 ruby cell center'>
                <img alt='xft_ruby' src={landingAssets.yolo_nft_ruby_512} />
              </div>
              <div className='ruby3 ruby cell left'>Rewards 2.5X</div>
              <div className='diamond1 diamond cell right'>Diamond</div>
              <div className='diamond2 diamond cell center'>
                <img alt='xft_diamond' src={landingAssets.yolo_nft_diamond_512} />
              </div>
              <div className='diamond3 diamond cell left'>Rewards 3X</div>
            </div>
          </div>

          <div className='features_wrapper'>
            <h4>YOLO Account</h4>
            <p>
              Change your username, reset your password, and watch your XFT status increase as you raise your bid count
            </p>
            <div className='account_feature'>
              <div id='account_menu'>
                <div className='dropdown'>
                  <menu>
                    <div className='window_account'>
                      <div className='window_user-id'>
                        <strong>Username</strong>
                        <input type='text' placeholder='Set User ID' value='CriptoGangsta' readOnly />
                        <button className='save'>Save</button>
                      </div>
                      <div className='nft_level emerald'>
                        <div className='nft_row'>
                          <div className='nft_icon emerald'></div>
                          <div className='nft_details_wrap'>
                            <div className='nft_title'>Emerald XFT</div>
                            <div className='nft_description'>
                              <strong>
                                You are at a Level 3 XFT
                                <br />
                                Here's what you need to upgrade:
                              </strong>
                            </div>
                          </div>
                        </div>
                        <div className='nft_row'>
                          <div className='empty'></div>
                          <div className='feature'>
                            <div className='title'>Total bids needed</div>
                            <div className='value'>2,000</div>
                          </div>
                          <div className='feature'>
                            <div className='title'>Total bids amount needed</div>
                            <div className='value'>$10,000</div>
                          </div>
                        </div>
                      </div>
                      <div className='bidder_stats_wrapper emerald'>
                        <div className='section'>
                          <div className='title'>Your total bids</div>
                          <div className='value'>423</div>
                        </div>
                        <div className='section'>
                          <div className='title'>Your total bids amount</div>
                          <div className='value'>$1340.23</div>
                        </div>
                      </div>
                      <ul className='bottom_links emerald'>
                        <li>
                          <button type='submit' className='dashboard'>
                            Dashboard
                          </button>
                        </li>
                      </ul>
                    </div>
                  </menu>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
