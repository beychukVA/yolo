import React from 'react'
import { isEqual } from 'lodash'

export const memoThis = (component) => React.memo(component, (prevProps, nextProps) => isEqual(prevProps, nextProps))
