import {
  Card,
  CardContent
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Edit, Trash } from 'lucide-react'


const WishItemList = (item) => {
  return (
    <Card>
      <CardContent className='flex items-center p-4'>
        <img
          src={item.imageUrl}
          alt={item.title}
          className='w-16 h-16 object-cover rounded mr-4'
        />
        <div className='flex-1'>
          <h4 className='text-lg font-semibold'>{item.title}</h4>
          <p className='text-sm text-muted-foreground'>{item.description}</p>
          {item.url && (
            <a
              href={item.url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-xs text-primary hover:underline'
            >
              View Website
            </a>
          )}
        </div>
        <div className='flex items-center space-x-2'>
          <Switch checked={item.completed} />
          <Button variant='outline' size='sm'>
            <Edit className='h-4 w-4' />
          </Button>
          <Button variant='outline' size='sm'>
            <Trash className='h-4 w-4' />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default WishItemList