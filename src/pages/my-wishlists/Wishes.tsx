import { AddWishModal } from '@/components/AddWishModal'
import EmptyDataCard from '@/components/ui/empty-data-card'
import Loader from '@/components/ui/loader'
import WishItem from '@/components/WishItem'
import { getByWishlist } from '@/services/wishes'
import { Wish } from '@/types/wishes'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

const WishesPage = () => {
  const { id = '' } = useParams()
  const { data: wishes, isLoading, refetch } = useQuery({
    queryKey: ['wishes'],
    queryFn: async() => getByWishlist(id)
  })

  return (
    <>
      <div className='w-full flex justify-between pb-6'>
        <h2 className='text-3xl font-bold'>Wishes</h2>
        {!isLoading && wishes && wishes.length > 0 && (
          <AddWishModal wishlist_id={id} onSubmit={refetch} />
        )}
      </div>

      {isLoading && (
        <div className='w-full h-full'>
          <Loader />
        </div>
      )}

      {!isLoading && !wishes?.length && (
        <section className='flex flex-col items-center justify-center w-full h-[calc(100%-24px)] overflow-auto'>
          <EmptyDataCard
            chidlren={<AddWishModal wishlist_id={id} onSubmit={refetch} />}
          />
        </section>
      )}

      {!isLoading && wishes && wishes.map((wish, index) => (
        <WishItem item={wish} key={index} wishlist_id={id} onEdit={refetch} onDelete={refetch} />
      ))}
    </>
  )
}

export default WishesPage
