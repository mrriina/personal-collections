import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Home from './pages/Home';
import Profile from './pages/Profile'
import Collection from './pages/Collection';
import Item from './pages/Item';
import Navbar from './components/NavBar';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, PROFILE_ROUTE, COLLECTION_ROUTE, ITEM_ROUTE } from './utils/routes'

function App() {
  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 overflow-y-auto scrollHide">
      <Navbar />
      <Routes>
        <Route path={HOME_ROUTE} element={<Home />} exact />
        <Route path={LOGIN_ROUTE} element={<Login />} exact />
        <Route path={REGISTRATION_ROUTE} element={<Registration />} exact />
        <Route path={PROFILE_ROUTE} element={<Profile />} exact />
        <Route path={COLLECTION_ROUTE} element={<Collection />} exact />
        <Route path={ITEM_ROUTE} element={<Item />} exact /> 
      </Routes>
    </div>
  );
}

export default App;