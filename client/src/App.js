import { Routes, Route } from 'react-router-dom';
import AuthUserRoute from './routes/AuthUserRoute';
import UnauthUserRoute from './routes/UnauthUserRoute';
import AdminRoute from './routes/AdminRoute';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <Routes>
        {/* <Route element={<AuthUserRoute />} >
          <Route element={<AdminRoute />} ></Route>
        </Route> */}

        {/* <Route element={<UnauthUserRoute />}> */}
          <Route path="/login" element={<Login />} exact />
          <Route path="/registration" element={<Registration />} exact />
          <Route path="/" element={<Home />} exact />
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
