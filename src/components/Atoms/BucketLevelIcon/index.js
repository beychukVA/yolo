import { LONG_DASH } from 'constants/index'
import { BucketLevelIconWrapper } from './BucketLevelIconsCSS.styled'

const BUCKET_LEVEL_ICONS = [
  <div className='level_ind first'>1</div>,
  <div className='level_ind second'>2</div>,
  <div className='level_ind third'>3</div>,
  <div className='level_ind fourth'>4</div>,
  <div className='level_ind fifth'>5</div>
]
export const BucketsLevelIcon = ({ level, size }) => {
  const remSize = {
    large: 1.3
  }
  return (
    <BucketLevelIconWrapper className='bid_type_24' remSize={remSize[size]}>
      {BUCKET_LEVEL_ICONS[level]}
    </BucketLevelIconWrapper>
  )
}

export const bucketsLevelIconText = {
  0: '\u2460',
  1: '\u2461',
  2: '\u2462',
  3: '\u2463',
  4: '\u2464'
}

export const bucketsLevelLimit = (level, buckets) => {
  if (buckets) {
    const bucketsLabels = buckets.map((item) => {
      const percentage = item / 100 //(100/10000)
      return `${percentage}%`
    })
    const bkt0 = `${bucketsLabels[0]}`
    const bkt1 = `${bucketsLabels[0]} to ${bucketsLabels[1]}`
    const bkt2 = `${bucketsLabels[1]} to ${bucketsLabels[2]}`
    const bkt3 = `${bucketsLabels[2]} to ${bucketsLabels[3]}`
    const bkt4 = `${bucketsLabels[3]}`
    if (!level) return [bkt0, bkt1, bkt2, bkt3, bkt4]
    return [bkt0, bkt1, bkt2, bkt3, bkt4][level]
  }
  return [LONG_DASH, LONG_DASH, LONG_DASH, LONG_DASH, LONG_DASH]
}
