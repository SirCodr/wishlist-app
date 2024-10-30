import { Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

const TopNavigation = () => {
  const navigate = useNavigate()

  return (
    <header className='border-b'>
      <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <h1 className='text-2xl font-bold'>WishList</h1>
        </div>
        <div className='flex items-center space-x-4'>
          <Button>
            <Plus className='mr-2 h-4 w-4' /> Create Wishlist
          </Button>
          <Avatar onClick={() => navigate('/user')} className='cursor-pointer'>
            <AvatarImage src='/placeholder.svg' alt='User' />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

export default TopNavigation
