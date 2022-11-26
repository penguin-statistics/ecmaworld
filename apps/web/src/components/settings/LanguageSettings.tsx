import { changeLanguage } from '@exusiai-dev/coredata/preferences'
import { RootState } from '@exusiai-dev/coredata/store'
import { SiteLanguages } from '@exusiai-dev/rest/v3/variants'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'

type LanguageOption = { id: SiteLanguages; name: string }
const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    id: 'zh',
    name: '简体中文',
  },
  {
    id: 'en',
    name: 'English',
  },
  {
    id: 'ja',
    name: '日本語',
  },
  {
    id: 'ko',
    name: '한국어',
  },
]

export const LanguageSettings = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const language = useSelector((state: RootState) => state.preference.language)
  const dispatch = useDispatch()

  const handleActivatorClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="menu"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleActivatorClick}
      >
        Language: {language}
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {LANGUAGE_OPTIONS.map((lang) => (
          <MenuItem
            sx={{
              '&': {
                fontFamily: 'JetBrains Mono',
              },
            }}
            key={lang.id}
            onClick={() => {
              dispatch(changeLanguage(lang))
              handleClose()
            }}
            selected={lang === language}
          >
            Change to Language: {lang.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
