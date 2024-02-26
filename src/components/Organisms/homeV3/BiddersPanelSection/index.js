export const BiddersPanelSection = ({ className }) => {
  return (
    <>
      <div id='level_4'>
        <div className='content'>
          <h4>
            A complete overview of your bids and bid history, other bidders, and a live bids gauge so you can fine-tune
            your strategies
          </h4>

          <div className='stats_feature'>
            <ul className='stats_feature_callouts'>
              <li className='callout one'>
                Keep track of your 10 most recent bids
                <div className='callout_arrow '></div>
              </li>
              <li className='callout two'>
                Follow who is bidding and how much they've won (or lost)
                <div className='callout_arrow '></div>
              </li>
              <li className='callout three'>
                See your own bids in multiple assets for all rounds
                <div className='callout_arrow '></div>
              </li>
              <li className='callout four'>
                The live bids meter gives you a real-time indicator of how others are bidding
                <div className='callout_arrow '></div>
              </li>
            </ul>
            <div id='stats'>
              <div id='bids_panel'>
                <div id='your_bids'>
                  <div className='your_bids_heading eth'>Your Bids</div>
                  <div className='bidders_list eth'>
                    <input id='toggle_eth' type='checkbox' defaultChecked={true} />
                    <label htmlFor='toggle_eth' className='currency_wrap'>
                      <div className='asset_icon'></div>
                      <div className='currency_type'>ETH / USD</div>
                    </label>

                    <div className='bidder you' id='bidders_expand_eth'>
                      <div className='single_transaction your_bid down pending'>
                        <div className='status_wrap'>
                          <div className='value'>
                            <div className='triangle down large'></div>
                            $5.00
                            <div className='round_type live'></div>
                          </div>
                          <div className='right'>
                            <div className='status'>
                              <div className='status_icon'></div>
                              Round <strong>32312965</strong>
                            </div>
                            <a href='#' className='clear_action'></a>
                          </div>
                        </div>
                      </div>
                      <div className='single_transaction confirmed'>
                        <div className='status_wrap'>
                          <div className='value'>
                            <div className='triangle up large'></div>
                            $25.00
                          </div>
                          <div className='right'>
                            <div className='status'>
                              <div className='status_icon'></div>
                              Round 32312964
                            </div>
                            <a href='#' className='clear_action'></a>
                          </div>
                        </div>
                      </div>
                      <div className='single_transaction confirmed'>
                        <div className='status_wrap'>
                          <div className='value'>
                            <div className='triangle up large'></div>
                            $25.00
                          </div>
                          <div className='right'>
                            <div className='status'>
                              <div className='status_icon'></div>
                              Round 32312964
                            </div>
                            <a href='#' className='clear_action'></a>
                          </div>
                        </div>
                      </div>
                      <div className='single_transaction confirmed'>
                        <div className='status_wrap'>
                          <div className='value'>
                            <div className='triangle up large'></div>
                            $25.00
                          </div>
                          <div className='right'>
                            <div className='status'>
                              <div className='status_icon'></div>
                              Round 32312964
                            </div>
                            <a href='#' className='clear_action'></a>
                          </div>
                        </div>
                      </div>
                      <div className='single_transaction confirmed'>
                        <div className='status_wrap'>
                          <div className='value'>
                            <div className='triangle up large'></div>
                            $25.00
                          </div>
                          <div className='right'>
                            <div className='status'>
                              <div className='status_icon'></div>
                              Round 32312964
                            </div>
                            <a href='#' className='clear_action'></a>
                          </div>
                        </div>
                      </div>
                      <div className='single_transaction failed'>
                        <div className='status_wrap'>
                          <div className='value'>
                            <div className='triangle up large'></div>
                            <span>$95.00</span>
                          </div>
                          <div className='right'>
                            <div className='status'>
                              <div className='status_icon'></div>
                              Round 32312963
                            </div>
                            <a href='#' className='clear_action'></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='bidders_list tesla'>
                    <input id='toggle_eth' type='checkbox' />
                    <label htmlFor='toggle_eth' className='currency_wrap'>
                      <div className='asset_icon'></div>
                      <div className='currency_type'>Tesla</div>
                    </label>

                    <div className='bidder you' id='bidders_expand_tesla'>
                      <div className='single_transaction confirmed'>
                        <div className='status_wrap'>
                          <div className='value'>
                            <div className='triangle up large'></div>
                            $25.00
                          </div>
                          <div className='right'>
                            <div className='status'>
                              <div className='status_icon'></div>
                              Round 32312964
                            </div>
                            <a href='#' className='clear_action'></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id='all_bids'>
                  <div className='all_bids_heading'>
                    Bids in round<strong>2352</strong>
                  </div>
                  <div className='module_boxes'>
                    <div className='box'>
                      198
                      <strong>Total bids</strong>
                    </div>
                    <div className='box'>
                      127
                      <strong>Players</strong>
                    </div>
                  </div>
                  <div className='all_bidders_list'>
                    <div className='bids_down'>
                      <div className='heading red light'>
                        <div className='number red light'>68</div>
                        <div className='triangle down huge red light'></div>
                      </div>
                      <div className='bidders_list'>
                        <div className='bidder'>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                Tinooooh1976
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle down small'></div>
                              $0.50 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                Bottomsup223
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle down small'></div>
                              $1.50 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                ScaryDingo794
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle down small'></div>
                              $1.80 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                Flavius0012
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle down small'></div>
                              $1.95 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                Cortesa
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle down small'></div>
                              $2.05 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                CriptoGangsta
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle down small'></div>
                              $2.95 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                Boochie
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle down small'></div>
                              $3.60 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                StellaArcher
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle down small'></div>
                              $4.25 <div className='currency_type'>USD</div>
                            </div>
                          </div>

                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                ArmadaState
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle down small'></div>
                              $6.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                TopAdminJan2
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle down small'></div>
                              $6.90 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                KarmaChamel11
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle down small'></div>
                              $8.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                Flamestone
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle down small'></div>
                              $10.90 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                SignalFlare990
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle down small'></div>
                              $0.50 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                ClarissaJune
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle down small'></div>
                              $1.50 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                VietWhat45
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle down small'></div>
                              $1.80 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                EyeofSauron6656
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle down small'></div>
                              $1.95 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                0x5...13T
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle down small'></div>
                              $2.05 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                0x5...13T
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle down small'></div>
                              $2.95 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                Boochie
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle down small'></div>
                              $3.60 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                0x1...42P
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle down small'></div>
                              $4.25 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='bids_up'>
                      <div className='heading green light'>
                        <div className='number green light'>59</div>
                        <div className='triangle up huge green light'></div>
                      </div>
                      <div className='bidders_list'>
                        <div className='bidder'>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                CaliforniaDemn
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $26.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                SorryCharly
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $25.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                YogsterYOLOX
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $40.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                Flobomo
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $20.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                CriptoGansta
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $21.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                InsaneTiger413
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $20.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                StampsRUs
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $10.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                MariaGuiti2395
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $17.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                SuenoJuarez
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $16.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                LuxDeluxeLion
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $50.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                FarFetchedFletch
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $30.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                YOLORuleZBling
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $25.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                CryptoGodzH436
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $26.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                TrubldDudeA
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $25.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                EthGodInfinity
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $40.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                PutinondaRitz
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $20.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                Bottomsup223
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $21.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                0x1...6X7
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $20.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                CaliforniaDrmn
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $10.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                Bottomsup223
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $17.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                0x1...687
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $16.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                CaliforniaDrmn
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $50.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                Bottomsup223
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $30.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                0x1...687
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $25.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                CaliforniaDemn
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $26.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                Bottomsup223
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $25.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                0x1...687
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $40.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                CaliforniaDrmn
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $20.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                Bottomsup223
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $21.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                0x1...6X7
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $20.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                CaliforniaDrmn
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $10.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                Bottomsup223
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $17.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                0x1...687
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $16.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                CaliforniaDrmn
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $50.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                Bottomsup223
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $30.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                0x1...687
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $25.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                CaliforniaDemn
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $26.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                Bottomsup223
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $25.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                0x1...687
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $40.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                CaliforniaDrmn
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $20.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                Bottomsup223
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $21.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                0x1...6X7
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $20.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                CaliforniaDrmn
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $10.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                Bottomsup223
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $17.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                0x1...687
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $16.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                CaliforniaDrmn
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $50.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                Bottomsup223
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $30.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                          <div className='single_transaction'>
                            <div className='status_wrap'>
                              <div className='status'>
                                <div className='status_icon'></div>
                                0x1...687
                              </div>
                            </div>
                            <div className='value'>
                              <div className='triangle up small'></div>
                              $25.00 <div className='currency_type'>USD</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='total'>
                <div id='live_bets_meter'>
                  <div className='live_bets_heading'>Live bids</div>
                  <div className='meter_wrapper'>
                    <div className='meter'></div>
                    <div className='needle_wrapper'>
                      <div className='needle'></div>
                    </div>
                  </div>
                  <div className='total_bids'>
                    <ul>
                      <li className='value down'>
                        <div className='live_bid_value red light'>$613.70</div>
                      </li>
                      <li className='value up'>
                        <div className='live_bid_value green light'>$984.25</div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='total_bid_amount'>
                  $1597.95
                  <strong>Total Bids Amount</strong>
                </div>
              </div>
            </div>{' '}
          </div>
        </div>
      </div>
    </>
  )
}
