import type { FC } from 'react'
import React from 'react'
import LandingPage from '@/app/components/landing-page'

const App: FC = () => {
  return (
    <LandingPage />
  )
}

export default React.memo(App)
