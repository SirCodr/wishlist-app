import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { useQuery } from '@tanstack/react-query'
import { getByUser } from '@/services/wishlists'
import useAuthStore from '@/store/auth'
import { WishList } from '@/types/wishlists'
import { Spinner } from '@chakra-ui/react'
import { WishCreateDto } from '@/types/wishes'

interface WishFormProps {
  onSubmit: (wish: WishCreateDto) => Promise<void>
  initialData?: WishCreateDto,
  isLoading?: boolean
}

const DEFAULT_WISH_DATA: WishCreateDto = {
  title: '',
  description: '',
  acquired: false,
  web_url: '',
  wishlist_id: ''
}

export function WishForm({
  onSubmit,
  initialData = DEFAULT_WISH_DATA,
  isLoading
}: WishFormProps) {
  const user = useAuthStore(state => state.user)
  const { data: wishlists, isLoading: isWishlistQuerying } = useQuery({
    queryKey: ['user-wishlist'],
    queryFn: () => getByUser(user!.id)
  })

  const [wishData, setWishData] = React.useState<WishCreateDto>({
    ...initialData,
    user_id: user?.id
  })
  const [isFormLoading, setFormLoading] = useState(false)

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setWishData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
      setFormLoading(true)
    try {
      e.preventDefault()
      await onSubmit(wishData)
    } catch (error) {
      console.error(error)
    } finally {
      setFormLoading(false)
    }
  }

  const WishSelectItems = ({wishlists }: { wishlists: WishList[] }) => {
    return wishlists.map((wishlist) => (
      <SelectItem value={wishlist.id}>{wishlist.name}</SelectItem>
    ))
  }

  useEffect(() => {
    setFormLoading(Boolean(isLoading))
  }, [isLoading])

  return (
    <form onSubmit={handleSubmit}>
      <div className='grid gap-4 py-4'>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='title' className='text-right'>
            Title
          </Label>
          <Input
            id='title'
            name='title'
            value={wishData.title}
            onChange={handleInputChange}
            className='col-span-3'
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='description' className='text-right'>
            Description
          </Label>
          <Textarea
            id='description'
            name='description'
            value={wishData.description}
            onChange={handleInputChange}
            className='col-span-3'
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='wishlist' className='text-right'>
            Wishlist
          </Label>
          {isWishlistQuerying ? (
            <Spinner />
          ) : (
            <Select
              onValueChange={(value) =>
                setWishData((prev) => ({ ...prev, wishlist_id: value }))
              }
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select a wishlist' />
              </SelectTrigger>
              <SelectContent>
                <WishSelectItems wishlists={wishlists || []} />
              </SelectContent>
            </Select>
          )}
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='web-url' className='text-right'>
            Web Url
          </Label>
          <Input
            id='web-url'
            name='web_url'
            value={wishData.web_url}
            onChange={handleInputChange}
            className='col-span-3'
          />
        </div>
      </div>
      <div className='flex justify-end'>
        <Button type='submit' disabled={isWishlistQuerying || isFormLoading}>
          {isFormLoading ? (
            <div className='flex items-center gap-x-2'>
              <span>Saving</span>
              <Spinner size='xs' />
            </div>
          ) : (
            'Save wish'
          )}
        </Button>
      </div>
    </form>
  )
}
