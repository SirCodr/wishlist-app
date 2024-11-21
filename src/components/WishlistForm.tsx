import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { WishlistCreateDto } from '@/types/wishlists'
import { Spinner } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { wishlistCreateSchema } from '@/schema/wishlistSchema'
import { toast } from 'sonner'

interface WishlistFormProps {
  onSubmit: (wish: WishlistCreateDto) => Promise<void>
  initialData?: Partial<WishlistCreateDto>,
  isLoading?: boolean
}

export function WishlistForm({
  onSubmit,
  isLoading,
  initialData
}: WishlistFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<WishlistCreateDto>({
    resolver: zodResolver(wishlistCreateSchema),
    defaultValues: initialData
  })

  const [isFormLoading, setFormLoading] = useState(false)

  const _onSubmit: SubmitHandler<WishlistCreateDto> = (data) => {
    setFormLoading(true)
    try {
      onSubmit(data)
    } catch (error) {
      console.error(error)
    } finally {
      setFormLoading(false)
    }
  }

  useEffect(() => {
    setFormLoading(Boolean(isLoading))
  }, [isLoading])

  useEffect(() => {
    const _errors = Object.entries(errors)
    if (_errors.length) toast.error(_errors[0][1].message)
  }, [errors])

  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      <div className='grid gap-4 py-4'>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='name' className='text-right'>
            Name
          </Label>
          <Input
            {...register('name')}
            required
            className='col-span-3'
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='description' className='text-right'>
            Description
          </Label>
          <Textarea
           {...register('description')}
            className='col-span-3'
          />
        </div>
      </div>
      <div className='flex justify-end'>
        <Button type='submit' disabled={isFormLoading}>
          {isFormLoading ? (
            <div className='flex items-center gap-x-2'>
              <span>Saving</span>
              <Spinner size='xs' />
            </div>
          ) : (
            'Save wishlist'
          )}
        </Button>
      </div>
    </form>
  )
}
