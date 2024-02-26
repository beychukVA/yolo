import React, { useState } from 'react'
import { ContestLayout } from 'components/Layouts/Contest.layout'
import { Wrapper } from './cssStyledWrapper'
import { ContestCards } from './contestCards'
import LeaderTable from 'components/Molecules/LeaderTable'

export const Leaderboard = () => {
  return (
    <ContestLayout>
      <Wrapper>
        <div id='default-page'>
          <div className='content'>
            <h1>Leaderboard & Contests</h1>
            <h2>
              All currencies are <strong>USDC</strong> unless otherwise specified
            </h2>
            {/* <LeaderTable pending={isPending} error={error} user={account} data={leaderTableData} sort={setSortBy} /> */}
            <LeaderTable />
            <ContestCards />
          </div>
        </div>
      </Wrapper>
    </ContestLayout>
  )
}
