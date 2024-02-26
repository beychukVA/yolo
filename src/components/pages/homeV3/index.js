import { HomeLayout } from 'components/Layouts/home'
import { IntroduceSection } from 'components/Organisms/homeV3/IntroduceSection'
import { Level2 } from 'components/Organisms/homeV3/Level2'
import { ChatSection } from 'components/Organisms/homeV3/ChatSection'
import { BiddersPanelSection } from 'components/Organisms/homeV3/BiddersPanelSection'
import { WalletSection } from 'components/Organisms/homeV3/WalletSection'
import { AccountSection } from 'components/Organisms/homeV3/AccountSection'
import { DashboardsSection } from 'components/Organisms/homeV3/DashboardsSection'
import { JoinYoloSection } from 'components/Organisms/homeV3/JoinYoloSection'
import { InvestorsSection } from 'components/Organisms/homeV3/InvestorSection'
import { ImmuneFiSection } from 'components/Organisms/homeV3/ImmuneFiSection'

import { PageWrapper } from './cssStyledWrapper'

export const HomePageV3 = () => {
  return (
    <HomeLayout>
      <PageWrapper id='pageWrapper'>
        {/* Main           */} <IntroduceSection />
        {/* level_2        */} <Level2 />
        {/* level_3        */} <ChatSection />
        {/* level_4        */} <BiddersPanelSection />
        {/* wallet         */} <WalletSection />
        {/* level4 account */} <AccountSection />
        {/* level_7        */} <DashboardsSection />
        {/* level_5 join   */} <JoinYoloSection />
        {/* level_6        */} <InvestorsSection />
        {/* level_8        */} <ImmuneFiSection />
      </PageWrapper>
    </HomeLayout>
  )
}
