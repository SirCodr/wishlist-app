import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function UserSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account preferences here.</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='name'>Name</Label>
          <Input id='name' defaultValue='Jane Doe' />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' type='email' defaultValue='jane@example.com' />
        </div>
        <div className='flex items-center space-x-2'>
          <Switch id='notifications' />
          <Label htmlFor='notifications'>Enable email notifications</Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  )
}
