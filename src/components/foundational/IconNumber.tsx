import mdiNumber0 from '@iconify/icons-mdi/number-0-circle-outline'
import mdiNumber1 from '@iconify/icons-mdi/number-1-circle-outline'
import mdiNumber2 from '@iconify/icons-mdi/number-2-circle-outline'
import mdiNumber3 from '@iconify/icons-mdi/number-3-circle-outline'
import mdiNumber4 from '@iconify/icons-mdi/number-4-circle-outline'
import mdiNumber5 from '@iconify/icons-mdi/number-5-circle-outline'
import mdiNumber6 from '@iconify/icons-mdi/number-6-circle-outline'
import mdiNumber7 from '@iconify/icons-mdi/number-7-circle-outline'
import mdiNumber8 from '@iconify/icons-mdi/number-8-circle-outline'
import mdiNumber9 from '@iconify/icons-mdi/number-9-circle-outline'
import { Icon, IconProps } from '@iconify/react'

import { FC } from 'react'

const map = {
  0: mdiNumber0,
  1: mdiNumber1,
  2: mdiNumber2,
  3: mdiNumber3,
  4: mdiNumber4,
  5: mdiNumber5,
  6: mdiNumber6,
  7: mdiNumber7,
  8: mdiNumber8,
  9: mdiNumber9,
}

export const IconNumber: FC<Omit<IconProps, 'icon'> & { value: number }> = ({
  value,
  ...iconProps
}) => {
  return map[value] ? (
    <Icon icon={map[value]} {...iconProps} />
  ) : (
    <>{String(value)}</>
  )
}
