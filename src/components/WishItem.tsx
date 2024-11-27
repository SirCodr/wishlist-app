import {
  Card,
  CardContent
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Gift, Share2, Trash } from 'lucide-react'
import { Wish } from '@/types/wishes'
import { EditWishModal } from './EditWishModal'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useMutation } from '@tanstack/react-query'
import { remove } from '@/services/wishes'
import { Skeleton } from './ui/skeleton'

type Props = {
  item: Wish
  wishlist_id?: string
}

type DeleteButtonProps = {
  id: string
  onSubmit: (id: string) => void
}

const WishItem = ({ item, wishlist_id }: Props) => {
  const { mutate, isPending } = useMutation({
    mutationFn: remove
  })

  if (isPending) return <Skeleton className="h-20 w-full" />

  return (
    <Card>
      <CardContent className='flex items-center p-4'>
        {item.web_url ? (
          <img
            src={item.image_url}
            alt={item.title}
            className='w-16 h-16 object-cover rounded mr-4'
          />
        ) : (
          <Gift
            className='text-muted-foreground mr-2'
            style={{ width: 30, height: 30 }}
          />
        )}
        <div className='flex-1'>
          <h4 className='text-lg font-semibold capitalize'>{item.title}</h4>
          <p className='text-sm text-muted-foreground'>{item.description}</p>
          {item.web_url && (
            <a
              href={item.web_url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-xs text-primary hover:underline'
            >
              View Website
            </a>
          )}
        </div>
        <div className='flex items-center space-x-2'>
          <EditWishModal wish={item} wishlist_id={wishlist_id} />
          <Button variant='outline' size='sm'>
            <Share2 className='h-4 w-4' />
          </Button>
          <DeleteButton id={item.id} onSubmit={mutate} />
        </div>
      </CardContent>
    </Card>
  )
}

const DeleteButton = (props: DeleteButtonProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <Trash className='h-4 w-4' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm delete</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            record.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => props.onSubmit(props.id)}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default WishItem