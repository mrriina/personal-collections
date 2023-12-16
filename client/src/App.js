import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import { routes } from './routes';


function App() {
  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 overflow-y-auto scrollHide">
      <Navbar />
      <Routes>
        {routes.map(({path, Component}) =>
          <Route key={path} path={path} element={Component} exact/>
        )}
        {/* <Route path={HOME_ROUTE} element={<Home />} exact />
        <Route path={LOGIN_ROUTE} element={<Login />} exact />
        <Route path={REGISTRATION_ROUTE} element={<Registration />} exact />
        <Route path={PROFILE_ROUTE} element={<Profile />} exact />
        <Route path={COLLECTION_ROUTE} element={<Collection />} exact />
        <Route path={ITEM_ROUTE} element={<Item />} exact />  */}
      </Routes>
    </div>
  );
}

export default App;