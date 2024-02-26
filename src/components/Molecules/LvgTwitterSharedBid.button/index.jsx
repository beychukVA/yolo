import { useYoloModal } from 'lib/yoloModals/useYoloModal'
import { useYoloToast } from 'lib/yoloToasts/useYoloToast'
import { LvgTwitterShareBidCss } from './LvgTwitterShareBidCss.styled'
import { isEmpty } from 'lodash'

const shareCardModalObj = {
  show: true,
  id: 'orderTwitterCard',
  backdropClose: false,
  backdropBlurred: false
}

export const LvgTwitterShareBid = ({ className, order, fromToast, variant }) => {
  const { updateModal } = useYoloModal()
  const { yToastDismiss } = useYoloToast()
  const showShareCard = (e) => {
    e?.preventDefault()
    e?.stopPropagation()
    updateModal({ ...shareCardModalObj, props: { order } })
    fromToast && yToastDismiss()
  }

  return (
    <LvgTwitterShareBidCss className={className} fromToast={fromToast} variant={variant}>
      <div className={`twitter_card_share-toast ${isEmpty(order) ? 'disable' : ''}`}>
        <div onClick={showShareCard}>{variant !== 'icon' && 'SHARE BID'}</div>
      </div>
    </LvgTwitterShareBidCss>
  )
}
