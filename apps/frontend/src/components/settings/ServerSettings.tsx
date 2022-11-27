import { changeServer } from '@exusiai-dev/coredata/preferences'
import { RootState } from '@exusiai-dev/coredata/store'
import { SiteServers } from '@exusiai-dev/rest/v3/variants'
import { Button, Menu, MenuItem } from '@mui/material'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type ServerOption = { id: SiteServers }
const SERVER_OPTIONS: ServerOption[] = [
  {
    id: 'CN',
  },
  {
    id: 'US',
  },
  {
    id: 'JP',
  },
  {
    id: 'KR',
  },
]

export const ServerSettings = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const activeServerId = useSelector(
    (state: RootState) => state.preference.server,
  )
  const dispatch = useDispatch()

  const handleActivatorClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    document.documentElement.dataset.server = activeServerId ?? 'CN'
  }, [activeServerId])

  return (
    <div>
      <Button
        variant="contained"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="menu"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleActivatorClick}
      >
        {activeServerId}
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {SERVER_OPTIONS.map((server) => (
          <MenuItem
            key={server.id}
            onClick={() => {
              dispatch(changeServer(server.id))
              handleClose()
            }}
            selected={server.id === activeServerId}
          >
            {server.id}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
