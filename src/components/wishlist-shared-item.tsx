import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { SharedWishList } from '@/types/wishlists'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Edit } from 'lucide-react'

type Props = {
  wishlist: SharedWishList
}

export default function WishlistSharedItem({ wishlist }: Props) {
  const navigate = useNavigate()

  return (
    <Card key={wishlist.id}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="capitalize">{wishlist.name}</CardTitle>
            <CardDescription>{wishlist.items} items</CardDescription>
          </div>
          {
            // <Badge variant="secondary" className="flex items-center gap-1">
            //   <Users className="h-3 w-3" />
            //   NOmbre de quien comparte
            // </Badge>
          }
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
      </CardFooter>
    </Card>
  )
}
