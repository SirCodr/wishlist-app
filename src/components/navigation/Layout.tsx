import { Outlet } from 'react-router-dom'
import Sidebar from './SideBar'
import TopNavigation from './TopNavigation'

const Layout = () => {
  return (
    <div className='flex w-screen h-screen bg-background'>
      <Sidebar />

      <main className='flex-1 overflow-auto p-4'>
        <div className='container mx-auto space-y-6'>
          <TopNavigation />
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout
