/* formatTimeStamp helpers */
const pad = (number, digits) => String(number).padStart(digits, '0')
export const padNumber = (number, digits) => String(number).padStart(digits, '0')

//year
const YYYY = (time) => pad(time.getFullYear(), 4)
const YY = (time) => pad(time.getFullYear(), 2)

//month
const MMMM = (time) => time.toLocaleString('default', { month: 'long' })
const MMM = (time) => time.toLocaleString('default', { month: 'short' })
const MM = (time) => pad(time.getMonth() + 1, 2)
const M = (time) => time.toLocaleString('default', { month: 'narrow' })

//day
const DD = (time) => pad(time.getDate(), 2)

// hours format
const hh = (time) => pad(time.getHours(), 2)

// minutes format
const m = (time) => pad(time.getMinutes(), 1)
const mm = (time) => pad(time.getMinutes(), 2)

// seconds format
const ss = (time) => pad(time.getSeconds(), 2)

/**
 * Formatted Seconds
 *
 * @param {number} time Time in Seconds
 * @return {string} Fomatted string
 */
export const formattedSeconds = (time) => {
  const second = Math.floor(time / 1000)
  const ms = Math.floor((time % 1000) / 10)

  return `${second}:${ms > 9 ? ms : `0${ms}`}`
}

export const formattedTimeArray = (time) => {
  const second = Math.floor(time / 1000)
  const ms = Math.floor((time % 1000) / 10)

  return [second > 9 ? second : `0${second}`, ms > 9 ? ms : `0${ms}`]
}

export const formatTimeStamp = (milliseconds, format) => {
  const time = new Date(milliseconds)
  const formattedTime = format
    .replace('YYYY', YYYY(time))
    .replace('YY', YY(time))
    .replace('DD', DD(time))
    .replace('mm', mm(time))
    .replace('hh', hh(time))
    .replace('m', m(time))
    .replace('ss', ss(time))
    .replace('MMMM', MMMM(time))
    .replace('MMM', MMM(time))
    .replace('MM', MM(time))
    .replace('M', M(time))
  return formattedTime
}
export const formatTimeStamp2 = (date, format) => {
  const formattedTime = format
    .replace('%YYYY', YYYY(date))
    .replace('%YY', YY(date))
    .replace('%DD', DD(date))
    .replace('%mm', mm(date))
    .replace('%hh', hh(date))
    .replace('%m', m(date))
    .replace('%ss', ss(date))
    .replace('%MMMM', MMMM(date))
    .replace('%MMM', MMM(date))
    .replace('%MM', MM(date))
    .replace('%M', M(date))
  return formattedTime
}

export const formatDurationMilliseconds = (milliseconds, format) => {
  const ss = (ms) => pad(Math.floor((ms / 1000) % 60), 2)
  const mm = (ms) => pad(Math.floor((ms / 1000 / 60) % 60), 2)
  const hh = (ms) => pad(Math.floor(ms / 1000 / 3600), 2)

  const formattedTime = format
    .replace('hh', hh(milliseconds))
    .replace('mm', mm(milliseconds))
    .replace('ss', ss(milliseconds))
  return formattedTime
}

export const formatUTCTimestampToLocale = (timestamp, format) =>
  new Date(timestamp).toLocaleString('us-US', {
    hour12: true,
    hour: format.includes('%hh') ? 'numeric' : undefined,
    minute: format.includes('%mm') ? 'numeric' : undefined,
    second: format.includes('%ss') ? 'numeric' : undefined
  })

export const formatUTCTimestamp = (timestamp) => {
  const date = new Date(timestamp)
  let hours = date.getUTCHours()
  let minutes = date.getUTCMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'

  hours %= 12
  hours = hours || 12

  hours = hours < 10 ? `0${hours}` : hours
  minutes = minutes < 10 ? `0${minutes}` : minutes

  const strTime = `${hours}:${minutes} ${ampm}`
  const strDate = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
  const today = new Date()
  const isToday =
    today.getUTCFullYear() === date.getUTCFullYear() &&
    today.getUTCMonth() === date.getUTCMonth() &&
    today.getUTCDate() === date.getUTCDate()
  const formattedDate = (isToday ? 'Today' : strDate) + ' @ ' + strTime + ' UTC'
  return formattedDate
}

export const setExactTimeout = function (callback, duration, resolution = 100) {
  const start = new Date().getTime()
  const timeout = setInterval(function () {
    if (new Date().getTime() - start > duration) {
      callback()
      clearInterval(timeout)
    }
  }, resolution)

  return timeout
}

export const formatTimeFromNow = (epochTimestamp) => {
  const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: 'auto'
  })

  const DIVISIONS = [
    { amount: 60, name: 'seconds' },
    { amount: 60, name: 'minutes' },
    { amount: 24, name: 'hours' },
    { amount: 7, name: 'days' },
    { amount: 4.34524, name: 'weeks' },
    { amount: 12, name: 'months' },
    { amount: Number.POSITIVE_INFINITY, name: 'years' }
  ]

  let duration = (new Date(epochTimestamp * 1000) - new Date()) / 1000

  for (let i = 0; i <= DIVISIONS.length; i++) {
    const division = DIVISIONS[i]
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name)
    }
    duration /= division.amount
  }
}

export const diffInFromNow = (deadLineTimeStamp, padNumber = 2) => {
  const nowTimeStamp = Date.now()
  const d = pad(parseInt((deadLineTimeStamp - nowTimeStamp) / (1000 * 60 * 60 * 24)), padNumber)
  const h = pad(parseInt((Math.abs(deadLineTimeStamp - nowTimeStamp) / (1000 * 60 * 60)) % 24), padNumber)
  const m = pad(parseInt((Math.abs(deadLineTimeStamp - nowTimeStamp) / (1000 * 60)) % 60), padNumber)
  const s = pad(parseInt((Math.abs(deadLineTimeStamp - nowTimeStamp) / 1000) % 60), padNumber)
  return { d, h, m, s }
}
