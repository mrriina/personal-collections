import { Routes, Route } from 'react-router-dom';
import AuthUserRoute from './routes/AuthUserRoute';
import UnauthUserRoute from './routes/UnauthUserRoute';
import AdminRoute from './routes/AdminRoute';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Home from './pages/Home';
import Profile from './pages/Profile'
import Collection from './pages/Collection';
import Navbar from './components/NavBar';

function App() {
  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 overflow-y-auto scrollHide">
      <Navbar />
      <Routes>
        {/* <Route element={<AuthUserRoute />} >
          <Route element={<AdminRoute />} ></Route>
        </Route> */}

        {/* <Route element={<UnauthUserRoute />}> */}
          <Route path="/login" element={<Login />} exact />
          <Route path="/registration" element={<Registration />} exact />
          <Route path="/" element={<Home />} exact />
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/collection/:id" element={<Collection />} exact /> 
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
