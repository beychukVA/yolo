import { usePriceFeed, usePriceFeed2 } from 'hooks/gameEngine/usePriceFeed'
import { useEffect, useState } from 'react'

const useGetStatementStatus = (order) => {
  const { priceFeed } = usePriceFeed2(order['Asset'])
  const [status, setStatus] = useState(false)

  useEffect(() => {
    const getStatus = () => {
      let direction = order['Side'] === 'buy' ? true : false
      let exitPrice =
        order['Exit'] && order['Exit'] !== '-' && Number(order['Exit']) !== 0
          ? Number(order['Exit'])
          : Number(priceFeed?.value)
      let status = direction
        ? exitPrice > Number(order['Entry'])
          ? true
          : false
        : exitPrice < Number(order['Entry'])
        ? true
        : false

      setStatus(status)
    }

    getStatus()
  }, [order, priceFeed?.value])

  return { status }
}

export default useGetStatementStatus
