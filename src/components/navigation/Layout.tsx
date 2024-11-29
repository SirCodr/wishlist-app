import { Outlet } from 'react-router-dom'
import Sidebar from './SideBar'
import TopNavigation from './TopNavigation'

const Layout = () => {
  return (
    <div className='flex w-screen h-screen bg-background'>
      <Sidebar />
      <main className='grid grid-rows-[auto_1fr] flex-1 h-full overflow-auto p-4'>
          <TopNavigation />
          <div className='py-6'>
            <Outlet />
          </div>
      </main>
    </div>
  )
}

export default Layout
