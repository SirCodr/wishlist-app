import React from 'react'
import {
  Search
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useQuery } from '@tanstack/react-query'
import { getSharedToUser } from '@/services/wishlists'
import useAuth from '@/hooks/useAuth'
import WishlistSharedItem from '@/components/wishlist-shared-item'

export default function SharedWishlistsPage() {
  const [sharedFilter, setSharedFilter] = React.useState('all')
  const [searchTerm, setSearchTerm] = React.useState('')
  const { user } = useAuth()
  const { data: wishlists = [], isLoading, refetch } = useQuery({
    queryKey: ['wishlists-shared-to-user'],
    queryFn: () => getSharedToUser(user!.id)
  })

  const filteredSharedWishlists = wishlists
    .filter((w) => w.shared)
    .filter(
      (w) => sharedFilter === 'all' || w.owner.toLowerCase() === sharedFilter
    )
    .filter(
      (w) =>
        w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.owner.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const uniqueOwners = Array.from(
    new Set(wishlists.filter((w) => w.shared).map((w) => w.owner))
  )

  return (
    <>
      <h2 className='text-3xl font-bold'>Shared wishlists</h2>

      <div className='mb-4 flex flex-col sm:flex-row gap-4'>
        <div className='flex-1'>
          <Label htmlFor='search-shared' className='sr-only'>
            Search shared wishlists
          </Label>
          <div className='relative'>
            <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              id='search-shared'
              placeholder='Search wishlists or owners'
              className='pl-8'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Select value={sharedFilter} onValueChange={setSharedFilter}>
          <SelectTrigger className='w-full sm:w-[180px]'>
            <SelectValue placeholder='Filter by owner' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Owners</SelectItem>
            {uniqueOwners.map((owner) => (
              <SelectItem key={owner} value={owner.toLowerCase()}>
                {owner}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {!isLoading && wishlists &&
          wishlists.map((wishlist) => (
            <WishlistSharedItem key={wishlist.id} wishlist={wishlist} onSubmit={refetch} />
          ))}
      </div>
    </>
  )
}
