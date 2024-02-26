export const ContestCards = () => {
  return (
    <div className='contests_wrapper'>
      <h1>Contests</h1>

      <div className='hottest_contests_wrapper'>
        <div className='x2_deposit_bonus contest_box'>
          <div className='banner-container'>
            <div className='banner active'>Now Active</div>
          </div>
          <div className='contest_kind'>WELCOMEBONUS (v2)</div>
          <div className='contest_content_overflow'>
            <div className='contest_title'></div>
            <div className='contest_section_detail large'>
              YOLOREKT is giving new users up-to 2X USDC Bonus for deposits *
            </div>
            <div className='contest_section_title'>How to redeem</div>
            <div className='contest_section_detail'>
              <div className='contest_prize_list'>
                <ul className='rules_list'>
                  <li>Visit YOLOREKT and Register</li>
                  <li>Register for a new account (no referral code necessary)</li>
                  <li>Deposit funds (USDC) into your Wallet</li>
                  <li>Get a 2.9% BONUS for every bid amount greater than $100, up to $1K</li>
                </ul>
              </div>
            </div>
            <div className='contest_section_title'>Conditions and Bonus Eligibility</div>
            <div className='contest_section_detail'>This promotion is subject to the following rules:</div>
            <div className='contest_prize_list'>
              <ul className='rules_list'>
                <li>This promotion will start on November 4, 2022, and will end at midnight December 3, 2022.</li>
                <li>
                  The new bonus is exclusive to new users only and is limited to 1 (one) per new user — No referral code
                  necessary.
                </li>
                <li>
                  For new users, the email address that is associated with the account must be successfully validated
                  before a bonus can be awarded. The email address must also be validated before deposits are made with
                  funds that lead to the receipt of bonuses. (If you want the bonus, validate your email before you do
                  anything else.)
                </li>
                <li>Maximum accumulated bonus is $1,000 USDC</li>
                <li>
                  Each user has 7 (seven) days to bid and claim the aforementioned ‘Bonus’ in the form of USDC. If the
                  Bonus USDC is not claimed within this timeframe, it will be removed from your wallet due to
                  inactivity.
                </li>
                <li>
                  Canvassing and creating multiple YOLOREKT accounts will lead to immediate disqualification and prompt
                  closure of all affected accounts
                </li>
                <li>
                  The maximum bonus and bonuses up to 100% will be credited to a user’s account within 48–72 hours upon
                  review of the account.
                </li>
                <li>
                  Once the bonus has been activated, users can check the rollover details before trying to withdraw the
                  pertinent bonus amount
                </li>
                <li>Please reach out to YOLOREKT (support@yolorekt.com) with any questions or concerns</li>
              </ul>
            </div>
            <div className='cta_area'>
              <button onClick={() => (window.location.href = 'https://yolorekt.finance/game')}>
                Get your Deposit Bonus now
              </button>
            </div>
          </div>
        </div>
        <div className='contest_1 contest_box'>
          <div className='banner-container'>
            <div className='banner'>Coming soon</div>
          </div>
          <div className='contest_kind'>WIN 3-In-A-Row</div>
          <div className='contest_content_overflow'>
            {/* <div className='contest_title'>MVP - Most Valued Player</div> */}
            <div className='contest_section_detail large'>
              Win 3 consecutive rounds in a row, and get $50 into your wallet towards future bids
            </div>
            <div className='contest_section_title'>Prize</div>
            <div className='contest_section_detail'>$50 for winning in 3 consecutive rounds</div>
            <div className='contest_section_title'>Rules</div>
            <div className='contest_section_detail'>This contest is subject to the following rules:</div>
            <div className='contest_prize_list'>
              <ul className='rules_list'>
                <li>
                  The 3 winning bids must be consecutively placed - 1 in each round. If the bidder loses one bid in
                  between the 3 rounds, the count resets to zero.
                </li>
                <li>The contest starts (soon) and will last for 7 days. There will be new winners every 24 hours.</li>
                <li>Rewards will be distributed within 24-48 hours from the time of winning.</li>
                <li>
                  The bidding volume applies to both bids ABOVE and bids BELOW for the aforementioned contest
                  duration(s).
                </li>
              </ul>
            </div>
            {/* <a href='#null' className='contest_conditions_list'>
              See conditions of contest
            </a> */}
          </div>
        </div>
        <div className='contest_box'>
          <div className='banner-container'>
            <div className='banner'>Coming soon</div>
          </div>

          <div className='contest_kind'>Alpha Bidder</div>
          <div className='contest_content_overflow'>
            <div className='contest_section_detail'>
              Every 24 hours, 3 users with the highest aggregate winning volume in USDC wins!
            </div>
            <div className='contest_section_title'>Prize</div>
            <div className='contest_section_detail'>
              <strong>$3,500 EVERY WEEK</strong> / $500 daily
            </div>
            <div className='contest_section_title'>Winners</div>
            <div className='contest_prize_list'>
              <ul className='prize_levels'>
                <li>1st prize</li>
                <li>2nd prize</li>
                <li>3rd prize</li>
              </ul>
              <ul className='prize_amounts'>
                <li>
                  <strong>$250</strong> USDC
                </li>
                <li>
                  <strong>$150</strong> USDC
                </li>
                <li>
                  <strong>$100</strong> USDC
                </li>
              </ul>
            </div>
            <div className='contest_section_title'>Rules</div>
            <div className='contest_section_detail'>This contest is subject to the following rules:</div>
            <div className='contest_prize_list'>
              <ul className='rules_list'>
                <li>A bidder should complete at least 10 bids to be eligible for this contest.</li>
                <li>Aggregate winning refers to the Total USDC won (minus) the Total USDC lost.</li>
                <li>
                  The contest will start (soon) and will last for 7 days. There will be a new set of winners every 24
                  hours.
                </li>
                <li>Rewards will be distributed within 1 week after the competition ends.</li>
                <li>
                  Bidding volume counts for both bids ABOVE and bids BELOW spanning the length of the competition.
                </li>
              </ul>
            </div>
            {/* <a href='#null' className='contest_conditions_list'>
              See conditions of contest
            </a> */}
          </div>
        </div>
        <div className='contest_box'>
          <div className='banner-container'>
            <div className='banner'>Coming soon</div>
          </div>

          <div className='contest_kind'>Rookie of the Day</div>
          <div className='contest_content_overflow'>
            <div className='contest_section_detail'>
              Every 24 hours, the user with the highest USDC win in one bid, wins!
            </div>
            <div className='contest_section_title'>Prize</div>
            <div className='contest_section_detail'>
              <strong>$3,500 EVERY WEEK</strong> / $500 daily
            </div>
            <div className='contest_section_title'>Winners</div>
            <div className='contest_prize_list'>
              <ul className='prize_levels'>
                <li>1st prize</li>
                <li>2nd prize</li>
                <li>3rd prize</li>
              </ul>
              <ul className='prize_amounts'>
                <li>
                  <strong>$500</strong> USDC
                </li>
                <li>
                  <strong>$300</strong> USDC
                </li>
                <li>
                  <strong>$200</strong> USDC
                </li>
              </ul>
            </div>
            <div className='contest_section_title'>Rules</div>
            <div className='contest_section_detail'>This contest is subject to the following rules:</div>
            <div className='contest_prize_list'>
              <ul className='rules_list'>
                <li>A bidder should complete at least 5 bids to be eligible for this contest.</li>
                <li>
                  The contest will start (soon) and will last for 7 days. There will be a new set of winners every 24
                  hours.
                </li>
                <li>Rewards will be distributed within 1 week after the competition ends.</li>
              </ul>
            </div>
            {/* <a href='#null' className='contest_conditions_list'>
              See conditions of contest
            </a> */}
          </div>
        </div>
      </div>
    </div>
  )
}
