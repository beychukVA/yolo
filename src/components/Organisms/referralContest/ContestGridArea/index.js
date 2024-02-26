import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { ASYNC_STATUS_ID } from 'constants/index'
import { useReferralData } from 'datasource/referralContest/useReferralData'
import { useToken } from 'utils/hooks/useToken'
import { Level22Wrapper } from './cssStyledWrapper'

export const ContestGridArea = () => {
  const { formatToken, tokenId } = useToken()
  const { data, hasStatus } = useReferralData()
  return (
    <Level22Wrapper>
      <div id='my-dashboard-grid'>
        <div className='level2_2'>
          <div id='item-0' className='box header_1'>
            Rewards Claimed / Rewards Available
          </div>
          <div id='item-1' className='box data_1_1'>
            <SingleDataLoader loading={hasStatus(ASYNC_STATUS_ID.PENDING)} data={data?.rewardsClaimed} />
          </div>
          <div id='item-6' className='box data_label'>
            <span className='slash_divider'>/</span>
            <span className='data_label_total'>
              <SingleDataLoader loading={hasStatus(ASYNC_STATUS_ID.PENDING)} data={data?.rewardsAvailable} />
            </span>
            <div className='yolo_currency_ind'>{tokenId}</div>
          </div>

          <div id='item-3' className='box header_1'>
            Your program rewards
          </div>
          <div id='item-5' className='box data_1_1 rewards'>
            <SingleDataLoader loading={hasStatus(ASYNC_STATUS_ID.PENDING)} data={data?.currentProgramRewards} />
          </div>
          <div id='spacer_3' className='box'></div>
          <div id='item-7' className='box data_label'>
            <div className='yolo_currency_ind'>{tokenId}</div>
          </div>
          <div id='spacer_6' className='box'></div>

          <div id='spacer_4' className='box'></div>
          <div id='spacer_7' className='box'></div>
          <div id='spacer_8' className='box'></div>
          <div id='item-20' className='box data_1_2 rewards_unharvested'></div>
          <div id='item-21' className='box data_label_2'></div>
        </div>
      </div>
    </Level22Wrapper>
  )
}
