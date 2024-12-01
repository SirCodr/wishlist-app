import { Plus, X } from 'lucide-react'
import { Button } from './ui/button'
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
    <div className='grid gap-4'>
      <form className='grid gap-4' onSubmit={handleAddEmail}>
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
        <div className='flex-1 max-h-[200px] overflow-y-auto'>
          {emails && emails.length > 0 && <EmailList emails={emails} onRemove={handleRemoveEmail} />}
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
  return (
    <div className='flex flex-wrap gap-2'>
      {emails.map((email) => (
        <div
          key={email}
          className="group flex items-center gap-1 bg-secondary text-secondary-foreground px-2.5 py-0.5 rounded-md text-sm"
        >
          <span>{email}</span>
          <button
            onClick={() => onRemove(email)}
            className="opacity-60 hover:opacity-100 focus:opacity-100 transition-opacity"
            aria-label={`Remove ${email}`}
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
    </div>
  )
}
