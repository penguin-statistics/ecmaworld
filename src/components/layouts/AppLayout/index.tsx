import { FCC } from 'types'

import { AppLayoutContentContainer } from './content'
import AppLayoutTopBar from './topbar'

export const AppLayout: FCC = ({ children }) => (
  <>
    <AppLayoutTopBar />
    <AppLayoutContentContainer>{children}</AppLayoutContentContainer>
  </>
)
