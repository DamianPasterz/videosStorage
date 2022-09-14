import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = (): JSX.Element => {
  return (
    <main>
      <Outlet />
    </main>
  )
}

export default Layout
