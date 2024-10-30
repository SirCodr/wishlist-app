import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TopNavigation from '@/components/navigation/TopNavigation'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const Layout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  

  return (
    <div className='flex flex-col w-screen h-screen bg-background'>
      <TopNavigation />

      <main className='flex-1 overflow-auto p-4'>
        <div className='container mx-auto space-y-6'>
          <Tabs value={location.pathname}>
            <TabsList className='grid w-full grid-cols-4 md:w-auto md:inline-flex'>
              <TabsTrigger
                value='/'
                onClick={() => navigate('/')}
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                value='/my-list'
                onClick={() => navigate('/my-list')}
              >
                My Lists
              </TabsTrigger>
              <TabsTrigger
                value='/shared'
                onClick={() => navigate('/shared')}
              >
                Shared
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout
