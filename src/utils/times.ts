import dayjs from 'dayjs'

const FORMATS = {
  MD: 'M.D',
  YMD: 'YY.M.D',
  HM: 'H:mm',
  HMS: 'H:mm:ss',
}

function needYear(moments: dayjs.Dayjs[]) {
  const years = moments.map((el) => el.get('year'))
  let last: number | null = null
  for (const year of years) {
    if (!last) last = year
    else if (year !== last) return true
  }
  return false
}

export type DayjsInput = string | number | Date | dayjs.Dayjs | null | undefined

export function formatDates(times: DayjsInput[], includeTime = false) {
  const dayjses = times
    .flatMap((ts) => {
      return dayjs(ts)
    })
    .filter((el) => !!el)

  const needsYear = needYear([...dayjses, dayjs()])
  return dayjses.map((time) => {
    if (includeTime)
      return time.format(
        `${needsYear ? FORMATS.YMD : FORMATS.MD} ${FORMATS.HM}`,
      )
    return time.format(`${needsYear ? FORMATS.YMD : FORMATS.MD}`)
  })
}

export function formatDate(date: DayjsInput, includeTime = false) {
  let template = FORMATS.MD
  const isSameYear = dayjs(date).isSame(dayjs(), 'year')
  template = isSameYear ? FORMATS.MD : FORMATS.YMD
  if (includeTime) template += ` ${FORMATS.HMS}`
  return dayjs(date).format(template)
}
