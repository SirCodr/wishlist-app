import { Home, List, Share2 } from 'lucide-react'
import { Button } from '../ui/button'
import { useLocation, useNavigate } from 'react-router-dom'

const NavContent = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className='space-y-2'>
      <Button
        variant={location.pathname === '/' ? 'secondary' : 'ghost'}
        className='w-full justify-start'
        onClick={() => navigate('/')}
      >
        <Home className='mr-2 h-4 w-4' />
        Dashboard
      </Button>
      <Button
        variant={location.pathname === '/my-list' ? 'secondary' : 'ghost'}
        className='w-full justify-start'
        onClick={() => navigate('/my-list')}
      >
        <List className='mr-2 h-4 w-4' />
        My Wishlists
      </Button>
      <Button
        variant={location.pathname === '/shared' ? 'secondary' : 'ghost'}
        className='w-full justify-start'
        onClick={() => navigate('/shared')}
      >
        <Share2 className='mr-2 h-4 w-4' />
        Shared Wishlists
      </Button>
    </nav>
  )
}

export default NavContent
