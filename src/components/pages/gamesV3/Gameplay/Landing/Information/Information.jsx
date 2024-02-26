import { Footer } from 'components/Organisms/Footers/Footer'
import { ImmuneFiSection } from 'components/Organisms/homeV3/ImmuneFiSection'
import { InvestorsSection } from 'components/Organisms/homeV3/InvestorSection'
import { JoinYoloSection } from 'components/Organisms/homeV3/JoinYoloSection'
import React from 'react'
import { PageWrapper } from './cssStyledWrapper'

export const Information = () => {
  return (
    <PageWrapper id='pageWrapper'>
      <InvestorsSection />
      <ImmuneFiSection />
      <JoinYoloSection />
      <Footer position='relative' bgColor='transparent' />
    </PageWrapper>
  )
}
