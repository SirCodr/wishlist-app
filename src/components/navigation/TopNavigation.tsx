import { Menu } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import NavContent from './NavContent'
import { AddWishModal } from '../AddWishModal'
import { getInitialsFromEmail } from '@/lib/utils'
import useAuth from '@/hooks/useAuth'

const TopNavigation = () => {
  const { user } = useAuth()
  const userInitials = user?.email ? getInitialsFromEmail(user?.email) : 'NN'
  const navigate = useNavigate()

  return (
    <header className='border-b'>
      <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <div className="flex items-center mb-8">
                    <h1 className="text-2xl font-bold">WishList</h1>
                  </div>
                  <NavContent />
                </SheetContent>
              </Sheet>
          <h1 className='text-2xl font-bold'>WishList</h1>
        </div>
        <div className='flex items-center space-x-4'>
          <AddWishModal />
          <Avatar onClick={() => navigate('/user')} className='cursor-pointer'>
            <AvatarImage src='/placeholder.svg' alt='User' />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

export default TopNavigation
