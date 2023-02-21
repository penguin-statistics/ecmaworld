import mdiDark from '@iconify/icons-mdi/brightness-2'
import mdiLight from '@iconify/icons-mdi/brightness-7'
import { IconButton } from '@mui/material'

import { IconifyIcon } from 'src/components/foundational/IconifyIcon'
import { useAppAppearance } from 'src/theme'

export default function AppearanceSettings() {
  const [appearance, setAppearance] = useAppAppearance()

  return (
    <IconButton
      onClick={() => setAppearance(appearance === 'light' ? 'dark' : 'light')}
    >
      <IconifyIcon
        color="white"
        icon={appearance === 'light' ? mdiLight : mdiDark}
      />
    </IconButton>
  )
}
