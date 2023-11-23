import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Home from './pages/Home';
import Profile from './pages/Profile'
import Collection from './pages/Collection';
import Item from './pages/Item';
import Navbar from './components/NavBar';

function App() {
  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 overflow-y-auto scrollHide">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/registration" element={<Registration />} exact />
        <Route path="/profile" element={<Profile />} exact />
        <Route path="/collection/:id" element={<Collection />} exact />
        <Route path="/item/:id" element={<Item />} exact /> 
      </Routes>
    </div>
  );
}

export default App;