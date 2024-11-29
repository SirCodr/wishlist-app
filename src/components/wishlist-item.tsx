import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { WishList } from '@/types/wishlists'
import { useNavigate } from 'react-router-dom'
import { ShareWishlistModal } from './share-wishlist-modal'
import { Button } from './ui/button'
import { Edit, Users } from 'lucide-react'
import { Badge } from './ui/badge'

type Props = {
  wishlist: WishList
  onSubmit: () => void
}

export default function WishlistItem({ wishlist, onSubmit }: Props) {
  const navigate = useNavigate()

  return (
    <Card key={wishlist.id}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="capitalize">{wishlist.name}</CardTitle>
            <CardDescription>{wishlist.items} items</CardDescription>
          </div>
          {wishlist.is_shared && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              Shared
            </Badge>
          )}
        </div>
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
        <ShareWishlistModal wishlist={wishlist} onSubmit={onSubmit} />
      </CardFooter>
    </Card>
  )
}
