import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/navigation/Layout';
import HomePage from './pages/Home';
import UserSettings from './pages/UserSettings';
import MyListPage from './pages/wishes/MyList';
import WishesPage from './pages/wishes/Wishes';
import SharedPage from './pages/wishes/Shared';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='my-list' element={<MyListPage />} />
          <Route path='my-list/:id' element={<WishesPage />} />
          <Route path='shared' element={<SharedPage />} />
          <Route path='user' element={<UserSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
