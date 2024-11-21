import React from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { create } from '@/services/wishlists'
import { WishlistForm } from './WishlistForm'
import { WishlistCreateDto } from '@/types/wishlists'
import useAuth from '@/hooks/useAuth'

export function AddWishlistModal() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = React.useState(false)
  const { mutate, isPending } = useMutation({
    mutationFn: create,
    onSuccess: () => setIsOpen(false)
  })

  async function handleWishSubmit(wishData: WishlistCreateDto) {
    mutate([wishData])
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Wishlist
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Wish</DialogTitle>
          <DialogDescription>
            Create a new wishlist. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <WishlistForm onSubmit={handleWishSubmit} isLoading={isPending} initialData={{ user_id: user!.id }} />
      </DialogContent>
    </Dialog>
  )
}