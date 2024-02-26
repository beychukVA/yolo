export const linearInterpolator =
  (domainArray, rangeArray, options = {}) =>
  (x) => {
    const { clamp, decimals } = options
    const multiPoint = (domainArray, rangeArray) => {
      const xClosest = domainArray.reduce((a, b, bIdx) => {
        let aDiff = Math.abs(a - x)
        let bDiff = Math.abs(b - x)
        if (aDiff === bDiff) {
          return a > b ? a : b
        } else {
          return bDiff < aDiff ? b : a
        }
      })
      const idx1 = domainArray.indexOf(xClosest)
      let idx2
      if (idx1 === domainArray.length - 1) {
        idx2 = idx1 - 1
      } else if (idx1 === 0) {
        idx2 = idx1 + 1
      } else if (x - xClosest >= 0) {
        idx2 = idx1 + 1
      } else if (x - xClosest < 0) {
        idx2 = idx1 - 1
      } else if (x === domainArray[0]) {
        idx2 = idx1 + 1
      } else if (x === domainArray[domainArray.length - 1]) {
        idx2 = idx1 - 1
      }
      if (idx2 - idx1 >= 0)
        return { domain: [domainArray[idx1], domainArray[idx2]], range: [rangeArray[idx1], rangeArray[idx2]] }
      if (idx2 - idx1 < 0)
        return { domain: [domainArray[idx2], domainArray[idx1]], range: [rangeArray[idx2], rangeArray[idx1]] }
    }

    const { domain, range } = multiPoint(domainArray, rangeArray) || {}
    const [x1, x2] = domain
    const [y1, y2] = range
    const m = (y2 - y1) / (x2 - x1)
    let value = m * (x - x1) + y1
    if (clamp) value = Math.min(Math.max(value, y1), y2)
    if (decimals >= 0) value = Number(value.toFixed(decimals))
    return value
  }

export const truncateWithDecimal = (value, decimals = 2) => {
  const factor = Math.pow(10, decimals)
  return Math.floor(value * factor) / factor
}
