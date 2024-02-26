import { landingAssets } from 'assets/landing/index.js'

export const DashboardsSection = ({ className }) => {
  return (
    <>
      <div id='level_7'>
        <div className='content'>
          <h4>Liquidity &amp; Bidders Dashboards</h4>
          <p>A full spectrum of views into your world at Yolorekt</p>

          <div className='screenshots'>
            <div className='bidders_ss'>
              <img src={landingAssets.bidders_screenshot} />
            </div>
            <div className='liquidity_ss'>
              <img src={landingAssets.liquidity_screenshot} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
