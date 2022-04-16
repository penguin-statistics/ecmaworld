import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { formatDate, formatDates } from 'utils/times'

export const TimeRange: FC<{
  start: number
  end?: number | null
}> = ({ start, end }) => {
  const { t } = useTranslation(['dataset'])
  if (start && end) {
    const dates = formatDates([start, end])
    return t('dataset:timeRange.inBetween', {
      start: dates[0],
      end: dates[1],
    })
  } else if (start && !end) {
    return t('dataset:timeRange.toPresent', { start: formatDate(start) })
  } else if (!start && end) {
    return t('dataset:timeRange.endsAt', { end: formatDate(end) })
  } else {
    return t('dataset:timeRange.unknown')
  }
}
