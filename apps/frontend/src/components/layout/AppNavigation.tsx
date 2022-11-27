import { SwipeableDrawer, styled } from '@mui/material'

import { useState } from 'react'

export const AppNavigationBase = styled(SwipeableDrawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}))

export const AppDrawer = () => {
  const [open, setOpen] = useState(false)
  return (
    <AppNavigationBase
      anchor="top"
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      asdf
    </AppNavigationBase>
  )
}
