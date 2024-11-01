import React from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { WishForm, WishData } from './WishForm'
import { Plus } from 'lucide-react'

interface AddWishModalProps {
  onWishAdded?: (wish: WishData) => void
}

export function AddWishModal({ onWishAdded }: AddWishModalProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleWishSubmit = (wishData: WishData) => {
    if (onWishAdded) {
      onWishAdded(wishData)
    }
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Wish
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Wish</DialogTitle>
          <DialogDescription>
            Create a new wish item. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <WishForm onSubmit={handleWishSubmit} />
      </DialogContent>
    </Dialog>
  )
}