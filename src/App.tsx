import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/navigation/Layout'
import HomePage from './pages/Home'
import UserSettings from './pages/UserSettings'
import MyListPage from './pages/wishes/MyList'
import WishesPage from './pages/wishes/Wishes'
import SharedPage from './pages/wishes/Shared'
import SignInPage from './pages/Sigin'
import AuthGuard from './guards/AuthGuard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<SignInPage />} />
        <Route element={<AuthGuard />}>
          <Route path='/' element={<Layout />}>
            <Route index path='dashboard' element={<HomePage />} />
            <Route path='wishlists' element={<MyListPage />} />
            <Route path='wishlists/:id' element={<WishesPage />} />
            <Route path='shared' element={<SharedPage />} />
            <Route path='user' element={<UserSettings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
