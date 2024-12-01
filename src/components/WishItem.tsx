import {
  Card, CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
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
  wishlist_id?: string,
  allowActions?: boolean,
  onEdit?: () => void,
  onDelete?: () => void,
}

type DeleteButtonProps = {
  id: string
  onSubmit: (id: string) => void
}

const WishItem = ({ item, wishlist_id, allowActions = true, onEdit = () => {}, onDelete = () => {} }: Props) => {
  const { mutate, isPending } = useMutation({
    mutationFn: remove,
    onSuccess: () => onDelete()
  })

  if (isPending) return <Skeleton className="h-20 w-full" />

  return (
    <>
      <Card className="overflow-hidden">
      {item.web_url && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={item.image_url}
            alt={`Preview of ${item.title}`}
            className="object-cover"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="capitalize">{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </div>
          {item.web_url && (
            <a
          href={item.web_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1.5 px-1.5 py-1 text-xs font-medium text-white bg-primary rounded-md shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Visit web
        </a>
          )}
        </div>
      </CardHeader>
      {allowActions && (
        <CardFooter className='gap-x-2'>
        <EditWishModal wish={item} wishlist_id={wishlist_id} onSubmit={onEdit} />
        <DeleteButton id={item.id} onSubmit={mutate} />
      </CardFooter>
      )}
    </Card>
    </>
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