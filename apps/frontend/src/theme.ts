import { createTheme } from '@mui/material'

import { appRootElement } from './config'

import './index.css'

export const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: appRootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: appRootElement,
      },
    },
    MuiModal: {
      defaultProps: {
        container: appRootElement,
      },
    },
    MuiDialog: {
      defaultProps: {
        container: appRootElement,
      },
    },
  },
})
