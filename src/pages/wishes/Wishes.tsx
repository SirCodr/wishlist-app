import { AddWishModal } from '@/components/AddWishModal'
import Loader from '@/components/ui/loader'
import WishItem from '@/components/WishItem'
import { getByWishlist } from '@/services/wishes'
import { Wish } from '@/types/wishes'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

const WishesPage = () => {
  const { id = '' } = useParams()
  const { data: wishes, isLoading } = useQuery({
    queryKey: ['wishes'],
    queryFn: async() => getByWishlist(id)
  })

  if (isLoading) return <Loader />

  return (
    <>
      <div className='w-full flex justify-between'>
        <h2 className='text-3xl font-bold'>Wishes</h2>
        <AddWishModal wishlist_id={id} />
      </div>
      {(wishes as Wish[]).map((wish, index) => (
        <WishItem item={wish} key={index} />
      ))}
    </>
  )
}

export default WishesPage
