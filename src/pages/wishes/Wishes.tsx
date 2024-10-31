import WishItem from '@/components/WishItem'
import { getAllWishes } from '@/services/wishes'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const WishesPage = () => {
  const { id } = useParams()
  const [wishes, setWishes] = useState([])

  useEffect(() => {
    ;(async () => {
      const req = await getAllWishes()
      console.log(req)
      setWishes(req.data)
    })()
  }, [])

  return (
    <>
      {wishes.map((wish, index) => (
        <WishItem item={wish} key={index} />
      ))}
    </>
  )
}

export default WishesPage
