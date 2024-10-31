import { Share2, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MyListPage() {
  const navigate = useNavigate()

  const wishlists = [
    {
      id: 1,
      title: 'Birthday Wishlist',
      items: 5,
      shared: false,
      owner: 'You'
    },
    {
      id: 2,
      title: 'Christmas Wishlist',
      items: 8,
      shared: true,
      owner: 'Alice Johnson'
    },
    {
      id: 3,
      title: 'Wedding Registry',
      items: 12,
      shared: true,
      owner: 'Bob Smith'
    },
    {
      id: 4,
      title: 'Housewarming Wishlist',
      items: 6,
      shared: true,
      owner: 'Charlie Brown'
    },
    {
      id: 5,
      title: 'Baby Shower Wishlist',
      items: 15,
      shared: true,
      owner: 'Diana Prince'
    }
  ]

  useEffect(() => {}, [])

  return (
    <>
      <h2 className='text-3xl font-bold'>Dashboard</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {wishlists
          .filter((w) => !w.shared)
          .map((wishlist) => (
            <Card key={wishlist.id}>
              <CardHeader>
                <CardTitle>{wishlist.title}</CardTitle>
                <CardDescription>{wishlist.items} items</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  variant='outline'
                  size='sm'
                  className='mr-2'
                  onClick={() => navigate('all')}
                >
                  <Edit className='mr-2 h-4 w-4' /> View
                </Button>
                <Button variant='outline' size='sm'>
                  <Share2 className='mr-2 h-4 w-4' /> Share
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </>
  )
}
