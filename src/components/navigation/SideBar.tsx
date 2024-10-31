import NavContent from './NavContent'

const Sidebar = () => {
  return (
    <aside className='hidden w-64 border-r bg-muted/40 lg:block p-6'>
      <div className='flex items-center mb-8'>
        <h1 className='text-2xl font-bold'>WishList</h1>
      </div>
      <NavContent />
    </aside>
  )
}

export default Sidebar
