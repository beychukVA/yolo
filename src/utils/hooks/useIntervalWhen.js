import { useRef, useEffect } from 'react'

/**
 * Inspire in https://github.com/imbhargav5/rooks/blob/main/src/hooks/useIntervalWhen.ts
 *
 * @param cb The callback to be invoked after interval
 * @param intervalDurationMs Amount of time in ms after which to invoke
 * @param when The condition which when true, sets the interval
 * @param startImmediate If the callback should be invoked immediately
 */
export const useIntervalWhen = (callback_, intervalDurationMs, when, startImmediate) => {
  const savedRefCallback = useRef()

  useEffect(() => {
    savedRefCallback.current = callback_
  })

  const callback = () => {
    savedRefCallback.current && savedRefCallback.current()
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (when) {
        if (startImmediate) {
          callback()
        }
        const interval = window.setInterval(callback, intervalDurationMs)

        return () => {
          window.clearInterval(interval)
        }
      }
    } else {
      console.warn('useIntervalWhen: window is undefined.')
    }
  }, [when, intervalDurationMs])
}
