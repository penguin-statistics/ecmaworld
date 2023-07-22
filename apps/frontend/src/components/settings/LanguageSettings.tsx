import { changeLanguage } from '@exusiai/coredata/preferences'
import { RootState } from '@exusiai/coredata/store'
import { SiteLanguages } from '@exusiai/rest/v3/variants'
import { Button, Menu, MenuItem } from '@mui/material'

import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
  const activeLanguageId = useSelector(
    (state: RootState) => state.preference.language,
  )
  const dispatch = useDispatch()

  const handleActivatorClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const activeLanguage = useMemo(
    () => LANGUAGE_OPTIONS.find((option) => option.id === activeLanguageId),
    [activeLanguageId],
  )

  useEffect(() => {
    document.documentElement.lang = activeLanguage?.id ?? 'en'
  }, [activeLanguage])

  return (
    <div>
      <Button
        variant="contained"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="menu"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleActivatorClick}
      >
        {activeLanguage?.name}
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {LANGUAGE_OPTIONS.map((lang) => (
          <MenuItem
            key={lang.id}
            onClick={() => {
              dispatch(changeLanguage(lang.id))
              handleClose()
            }}
            selected={lang.id === activeLanguageId}
          >
            {lang.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
