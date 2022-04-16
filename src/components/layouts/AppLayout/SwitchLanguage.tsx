import mdiTranslate from '@iconify/icons-mdi/translate'
import { Icon } from '@iconify/react'
import { IconButton, Menu, MenuItem } from '@mui/material'

import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

const languages = [
  {
    label: '简体中文',
    value: 'zh',
  },
  {
    label: 'English',
    value: 'en',
  },
  {
    label: '日本語',
    value: 'ja',
  },
  {
    label: '한국어',
    value: 'ko',
  },
]

export const SwitchLanguage: FC = () => {
  const { i18n } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang)
    handleMenuClose()
  }

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Icon icon={mdiTranslate} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {languages.map(({ label, value }) => (
          <MenuItem
            key={value}
            onClick={() => handleLanguageChange(value)}
            selected={value === i18n.language}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
