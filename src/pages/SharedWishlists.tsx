import React from 'react'
import {
  Edit,
  Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

export default function SharedWishlistsPage() {
  const [sharedFilter, setSharedFilter] = React.useState('all')
  const [searchTerm, setSearchTerm] = React.useState('')

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
      <h2 className='text-3xl font-bold'>Dashboard</h2>

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
        {filteredSharedWishlists.map((wishlist) => (
          <Card key={wishlist.id}>
            <CardHeader>
              <CardTitle className='flex justify-between items-start'>
                <span>{wishlist.title}</span>
                <Badge variant='secondary'>{wishlist.owner}</Badge>
              </CardTitle>
              <CardDescription>{wishlist.items} items</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant='outline' size='sm'>
                <Edit className='mr-2 h-4 w-4' /> View
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}
