import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/navigation/Layout'
import HomePage from './pages/Home'
import UserSettings from './pages/UserSettings'
import MyWishlists from './pages/my-wishlists/MyWishlists'
import WishesPage from './pages/my-wishlists/Wishes'
import SharedWishlistsPage from './pages/SharedWishlists'
import SignInPage from './pages/Sigin'
import AuthGuard from './guards/AuthGuard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<SignInPage />} />
        <Route element={<AuthGuard />}>
          <Route path='/' element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path='dashboard' element={<HomePage />} />
            <Route path='wishlists' element={<MyWishlists />} />
            <Route path='wishlists/:id' element={<WishesPage />} />
            <Route path='shared' element={<SharedWishlistsPage />} />
            <Route path='user' element={<UserSettings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
