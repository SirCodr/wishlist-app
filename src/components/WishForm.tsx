import React from 'react'
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

interface WishFormProps {
  onSubmit: (wish: WishData) => void
  initialData?: WishData
}

export interface WishData {
  title: string
  description: string
  price: string
  url: string
}

export function WishForm({
  onSubmit,
  initialData = { title: '', description: '', price: '', url: '' }
}: WishFormProps) {
  const [wishData, setWishData] = React.useState<WishData>(initialData)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setWishData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(wishData)
  }

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
          <Label htmlFor='price' className='text-right'>
            Category
          </Label>
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select a category' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='light'>Light</SelectItem>
              <SelectItem value='dark'>Dark</SelectItem>
              <SelectItem value='system'>System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='url' className='text-right'>
            URL
          </Label>
          <Input
            id='url'
            name='url'
            value={wishData.url}
            onChange={handleInputChange}
            className='col-span-3'
          />
        </div>
      </div>
      <div className='flex justify-end'>
        <Button type='submit'>Save wish</Button>
      </div>
    </form>
  )
}
