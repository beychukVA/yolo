import { landingAssets } from 'assets/landing/index.js'

export const WalletSection = ({ className }) => {
  return (
    <>
      <div id='wallet_level' className='wallet'>
        <div className='content max shading'>
          <div className='features_wrapper'>
            <h4>Wallet</h4>
            <p>
              View all of your Wallet balances, and Deposit &amp; Withdraw USDC quickly and easily using a Polygon
              Exchange or your Credit/Debit card via Transak - all in one place.
            </p>
            <div className='wallet_feature'>
              <div className='screenshots'>
                <div className='wallet_ss'>
                  <img alt='walletPage' src={landingAssets.yolo_wallet_page_screenshot} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
