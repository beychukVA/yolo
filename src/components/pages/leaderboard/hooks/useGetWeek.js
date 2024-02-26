import { useEffect, useState } from 'react'

const options = { month: 'short', day: 'numeric' }

export const useGetWeek = () => {
  const [currentWeek, setCurrentWeek] = useState({ name: '', startDate: '', endDate: '' })
  const [previousWeek, setPreviousWeek] = useState({ name: '', startDate: '', endDate: '' })
  const [currentWeekDayStart, setCurrentWeekDayStart] = useState(
    new Date().getDate() - (new Date().getDay() === 0 ? 6 : new Date().getDay() - 1)
  )

  const getCurrentWeek = () => {
    const currentWeekDayEnd = currentWeekDayStart + 6
    const currentWeekStart = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), currentWeekDayStart))
    const currentWeekEnd = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), currentWeekDayEnd))

    setCurrentWeek({
      name: `${new Intl.DateTimeFormat('en-US', options).format(currentWeekStart)} - ${new Intl.DateTimeFormat(
        'en-US',
        options
      ).format(currentWeekEnd)}`,
      startDate: `${currentWeekStart.getFullYear()}-${currentWeekStart.getMonth() + 1}-${currentWeekStart.getDate()}`,
      endDate: `${currentWeekEnd.getFullYear()}-${currentWeekEnd.getMonth() + 1}-${currentWeekEnd.getDate()}`
    })
  }

  const getPreviousWeek = () => {
    const previousWeekDayStart = currentWeekDayStart - 7
    const previousWeekDayEnd = currentWeekDayStart - 1
    const previousWeekStart = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), previousWeekDayStart))
    const previousWeekEnd = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), previousWeekDayEnd))

    setPreviousWeek({
      name: `${new Intl.DateTimeFormat('en-US', options).format(previousWeekStart)} - ${new Intl.DateTimeFormat(
        'en-US',
        options
      ).format(previousWeekEnd)}`,
      startDate: `${previousWeekStart.getFullYear()}-${
        previousWeekStart.getMonth() + 1
      }-${previousWeekStart.getDate()}`,
      endDate: `${previousWeekEnd.getFullYear()}-${previousWeekEnd.getMonth() + 1}-${previousWeekEnd.getDate()}`
    })
  }

  useEffect(() => {
    getCurrentWeek()
    getPreviousWeek()
  }, [])

  return { currentWeek, previousWeek }
}
