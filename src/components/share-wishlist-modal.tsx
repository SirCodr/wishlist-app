import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Share2 } from 'lucide-react'
import { DialogTrigger } from "@radix-ui/react-dialog"
import ShareWishlistForm from "./share-wishlist-form"
import { WishList } from "@/types/wishlists"
import { useMutation } from "@tanstack/react-query"
import { share } from "@/services/wishlists"

interface ShareWishlistModalProps {
  onSubmit?: () => void
  wishlist: WishList
}

export function ShareWishlistModal({ wishlist, onSubmit }: ShareWishlistModalProps) {
  const { mutate } = useMutation({
    mutationFn: async(emails: string[]) => share(wishlist.id, emails),
    onSuccess: () => {
      if (onSubmit) onSubmit()

      setIsOpen(false)
    }
  })
  const [isOpen, setIsOpen] = useState(false)

  const handleShare = (emails: string[]) => {
    mutate(emails)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
            <Share2 className='mr-2 h-4 w-4' /> Share
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Wishlist</DialogTitle>
          <DialogDescription>
            Add emails of people you want to share <b>"{wishlist.name}"</b> with.
          </DialogDescription>
        </DialogHeader>
        <ShareWishlistForm onSubmit={handleShare} />
      </DialogContent>
    </Dialog>
  )
}