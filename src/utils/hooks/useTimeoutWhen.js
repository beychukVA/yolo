import { useEffect } from 'react'

/**
 * Inspire in https://github.com/imbhargav5/rooks/blob/main/src/hooks/useTimeoutWhen.ts
 * @param {*} callback
 * @param {*} timeoutDelayMs
 * @param {*} when
 */
export const useTimeoutWhen = (callback, timeoutDelayMs = 0, when = true) => {
  useEffect(() => {
    if (when) {
      if (typeof window !== 'undefined') {
        const timeout = window.setTimeout(callback, timeoutDelayMs)

        return () => {
          window.clearTimeout(timeout)
        }
      } else {
        console.warn('useTimeoutWhen: window is undefined.')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [when])
}
