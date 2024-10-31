import Loader from '@/components/ui/loader'
import WishItem from '@/components/WishItem'
import { getAllWishes } from '@/services/wishes'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const WishesPage = () => {
  const { id } = useParams()
  const { data: wishes, isLoading } = useQuery({
    queryKey: ['wishes'],
    queryFn: getAllWishes
  })

  if (isLoading) return <Loader />

  return (
    <>
      {wishes.data.map((wish, index) => (
        <WishItem item={wish} key={index} />
      ))}
    </>
  )
}

export default WishesPage
