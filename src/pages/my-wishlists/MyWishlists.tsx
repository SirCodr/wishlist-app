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
import useAuth from '@/hooks/useAuth'
import { AddWishlistModal } from '@/components/AddWishlistModal'
import EmptyDataCard from '@/components/ui/empty-data-card'

export default function MyWishlistsPage() {
  const { user } = useAuth()
  const { data: wishlists, isLoading, refetch } = useQuery({
    queryKey: ['wishlists'],
    queryFn: () => getByUser(user!.id)
  }) 
  const navigate = useNavigate()

  return (
    <>
      <div className='w-full flex justify-between pb-6'>
        <h2 className='text-3xl font-bold'>My wishlists</h2>
        {wishlists && wishlists.length > 0 && <AddWishlistModal onSubmit={refetch} />}
      </div>

      {
        isLoading && (
          <div className='w-full h-full'>
            <Loader />
          </div>
        )
      }

      {!isLoading && !wishlists?.length && (
          <section className='flex flex-col items-center justify-center w-full h-full'>
            <EmptyDataCard chidlren={<AddWishlistModal onSubmit={refetch} />} />
          </section>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {!isLoading && wishlists &&
          wishlists.map((wishlist) => (
            <Card key={wishlist.id}>
              <CardHeader>
                <CardTitle className='capitalize'>{wishlist.name}</CardTitle>
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
                <Button variant='outline' size='sm' disabled>
                  <Share2 className='mr-2 h-4 w-4' /> Share
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </>
  )
}
