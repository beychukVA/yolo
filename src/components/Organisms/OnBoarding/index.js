import { GameBrowserTour } from './GameBrowser.tour'
import { GamePageTour } from './GamePage.tour'
import { LiveRoundTour } from './LiveRound.tour'
import { NextPredictTour } from './NextPredict.tour'
// import { WalletConnectTour } from './WalletConnect.tour'
// import { AssetsSelectorTour } from './AssetsSelector.tour'
// import { YourBidsTour } from './YourBids.tour'

export const OnBoarding = () => {
  return (
    <>
      {/* o1 */} <GamePageTour />
      {/* o2 */} {/* <WalletConnectTour /> */}
      {/* o3 */} {/* <AssetsSelectorTour */}
      {/* o4 */} <GameBrowserTour />
      {/* o5 */} <NextPredictTour />
      {/* o6 */} <LiveRoundTour />
      {/* o7 */} {/* <YourBidsTour /> */}
    </>
  )
}
