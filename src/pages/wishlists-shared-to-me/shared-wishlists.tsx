import { useQuery } from '@tanstack/react-query'
import { getSharedToUser } from '@/services/wishlists'
import useAuth from '@/hooks/useAuth'
import WishlistSharedItem from '@/components/wishlist-shared-item'

export default function SharedWishlistsPage() {
  const { user } = useAuth()
  const { data: wishlists = [], isLoading } = useQuery({
    queryKey: ['wishlists-shared-to-user'],
    queryFn: () => getSharedToUser(user!.id)
  })

  return (
    <>
      <h2 className='text-3xl font-bold pb-6'>Shared wishlists</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {!isLoading && wishlists &&
          wishlists.map((wishlist) => (
            <WishlistSharedItem key={wishlist.id} wishlist={wishlist} />
          ))}
      </div>
    </>
  )
}
