import { Share2, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getByUser } from '@/services/wishlists'
import Loader from '@/components/ui/loader'

export default function MyListPage() {
  const { data: wishlists, isLoading } = useQuery({
    queryKey: ['wishlists'],
    queryFn: () => getByUser('250cd40b-4be8-41d1-9477-9b13d3d33ac5')
  }) 
  const navigate = useNavigate()

  if (isLoading) return <Loader />

  return (
    <>
      <h2 className='text-3xl font-bold'>Dashboard</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {wishlists && wishlists
          .map((wishlist) => (
            <Card key={wishlist.id}>
              <CardHeader>
                <CardTitle>{wishlist.name}</CardTitle>
                <CardDescription>{wishlist.items} items</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  variant='outline'
                  size='sm'
                  className='mr-2'
                  onClick={() => navigate(`${wishlist.id}`)}
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
