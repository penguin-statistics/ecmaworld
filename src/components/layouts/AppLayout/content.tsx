import Container from '@mui/material/Container'

import { FCC } from 'types'

export const AppLayoutContentContainer: FCC = ({ children }) => (
  <Container
    maxWidth="xl"
    sx={{
      paddingTop: '6rem',
      height: '100%',
    }}
  >
    {children}
  </Container>
)
