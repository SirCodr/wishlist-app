'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Avatar,
  Button,
  Checkbox,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react'
import { twMerge } from 'tailwind-merge'
import { AddIcon, DeleteIcon, LinkIcon, StarIcon } from '@chakra-ui/icons'

interface WishlistItem {
  id: number
  name: string
  price: string
  completed: boolean
}

export default function HomePage() {
  const [items, setItems] = useState<WishlistItem[]>([
    { id: 1, name: 'New iPhone', price: '$999', completed: false },
    { id: 2, name: 'MacBook Pro', price: '$1999', completed: false },
    { id: 3, name: 'AirPods Pro', price: '$249', completed: true }
  ])
  const [sharedItems, setSharedItems] = useState<WishlistItem[]>([
    { id: 1, name: 'Nintendo Switch', price: '$299', completed: false },
    { id: 2, name: 'PS5', price: '$499', completed: false }
  ])
  const [newItem, setNewItem] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [shareEmail, setShareEmail] = useState('')

  const addItem = () => {
    if (newItem.trim()) {
      setItems([
        ...items,
        { id: Date.now(), name: newItem, price: '$0', completed: false }
      ])
      setNewItem('')
      setIsAdding(false)
    }
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const toggleComplete = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const shareWishlist = () => {
    console.log(`Sharing wishlist with ${shareEmail}`)
    setIsSharing(false)
    setShareEmail('')
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 p-4'>
      <header className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-semibold text-purple-800'>Wishlist</h1>
        <div className='flex items-center space-x-2'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setIsSharing(true)}
          >
            <LinkIcon className="h-5 w-5 text-purple-600" />
          </Button>
          <Avatar className='w-10 h-10' src='https://bit.ly/dan-abramov'>
          </Avatar>
        </div>
      </header>

      <Tabs className='mb-6'>
        <TabList className='grid w-full grid-cols-2'>
          <Tab value='my-wishlist'>My Wishlist</Tab>
          <Tab value='shared-wishlist'>Shared With Me</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={twMerge(
                    'bg-white rounded-lg shadow-md p-4 flex justify-between items-center mb-4',
                    item.completed && 'bg-gray-100'
                  )}
                >
                  <div className={twMerge(item.completed && 'opacity-50')}>
                    <h2 className='font-medium text-gray-800'>{item.name}</h2>
                    <p className='text-sm text-gray-500'>{item.price}</p>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Button
                      variant='ghost'
                      size='icon'
                      className={twMerge(
                        'text-green-500 hover:text-green-700',
                        item.completed && 'bg-green-100'
                      )}
                      onClick={() => toggleComplete(item.id)}
                    >
                      <Checkbox className='h-5 w-5' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='text-red-500 hover:text-red-700'
                      onClick={() => removeItem(item.id)}
                    >
                      <DeleteIcon className="h-5 w-5" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </TabPanel>
          <TabPanel>
            <AnimatePresence>
              {sharedItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className='bg-white rounded-lg shadow-md p-4 flex justify-between items-center mb-4'
                >
                  <div>
                    <h2 className='font-medium text-gray-800'>{item.name}</h2>
                    <p className='text-sm text-gray-500'>{item.price}</p>
                  </div>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='text-purple-500 hover:text-purple-700'
                  >
                    <StarIcon className="h-5 w-5" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <AnimatePresence>
        {isAdding ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className='fixed bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 z-10'
          >
            <Input
              type='text'
              placeholder='New item name'
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className='mb-2'
            />
            <div className='flex justify-end space-x-2'>
              <Button variant='outline' onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button onClick={addItem}>Add Item</Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className='fixed bottom-4 right-4'
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <Button
              size='icon'
              className='w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg'
              onClick={() => setIsAdding(true)}
            >
              <AddIcon className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AlertDialog isOpen={isSharing} leastDestructiveRef={null}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <h1>Share Your Wishlist</h1>
            <span>
              Enter the email address of the person you want to share your
              wishlist with.
            </span>
          </AlertDialogHeader>
          <AlertDialogBody className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='email' className='text-right'>
                Email
              </label>
              <Input
                id='email'
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                placeholder='friend@example.com'
                className='col-span-3'
              />
            </div>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={shareWishlist}>Share</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
