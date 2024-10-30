import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/navigation/Layout';
import HomePage from './pages/Home';
import MyList from './pages/MyList';
import SharedList from './pages/SharedList';
import UserSettings from './pages/UserSettings';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='my-list' element={<MyList />} />
          <Route path='shared' element={<SharedList />} />
          <Route path='user' element={<UserSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
