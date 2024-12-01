import { Plus, X } from 'lucide-react'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { FormEvent, useState } from 'react'
import useAuth from '@/hooks/useAuth'

type Props = {
  onSubmit: (emails: string[]) => void,
  initialData?: string[]
  editMode?: boolean
}

export default function ShareWishlistForm({ onSubmit, editMode, initialData = [] }: Props) {
  const { user } = useAuth()
  const [email, setEmail] = useState('')
  const [emails, setEmails] = useState<string[]>(initialData)
  const [error, setError] = useState('')

  const handleAddEmail = (e: FormEvent) => {
    try {
      e.preventDefault()

      const hasOwnEmail = email.toLowerCase() === user!.email!.toLowerCase()

      if (hasOwnEmail) throw Error('Own email can not be added')

      if (email && !emails.includes(email)) {
        setEmails([...emails, email])
        setEmail('')
        setError('')
      }
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  }

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails(emails.filter((e) => e !== emailToRemove))
  }

  return (
    <div className='grid gap-4 py-4'>
      <form className='grid gap-4 py-4' onSubmit={handleAddEmail}>
        <div className='flex items-end gap-2'>
          <div className='flex-1'>
            <Label htmlFor='email' className='text-sm font-medium'>
              Email
            </Label>
            <Input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='example@email.com'
              className='mt-1.5'
            />
          </div>
          <Button
            type='submit'
            size='icon'
            className='flex-shrink-0'
          >
            <Plus className='h-4 w-4' />
          </Button>
        </div>
        <div className='min-h-[100px] max-h-[200px] overflow-y-auto'>
          <EmailList emails={emails} onRemove={handleRemoveEmail} />
          {error && <div className='text-center text-sm text-red-500'>Error: {error}</div>}
        </div>
      </form>
      <Button onClick={() => onSubmit(emails)} className='w-full sm:w-auto' disabled={!emails.length}>
        {editMode ? 'Update emails' : 'Share Wishlist'}
      </Button>
    </div>
  )
}

interface EmailListProps {
  emails: string[]
  onRemove: (email: string) => void
}

export function EmailList({ emails, onRemove }: EmailListProps) {
  if (emails.length === 0) {
    return (
      <div className='text-center text-sm text-muted-foreground py-4'>
        No emails added yet
      </div>
    )
  }

  return (
    <div className='space-y-2'>
      {emails.map((email) => (
        <div key={email} className='flex items-center space-x-2'>
          <Checkbox id={`email-${email}`} />
          <label
            htmlFor={`email-${email}`}
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            {email}
          </label>
          <button
            onClick={() => onRemove(email)}
            className='ml-auto text-gray-500 hover:text-gray-700'
            aria-label={`Remove ${email}`}
          >
            <X className='h-4 w-4' />
          </button>
        </div>
      ))}
    </div>
  )
}
