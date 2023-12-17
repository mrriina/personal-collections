import { Routes, Route } from 'react-router-dom';
import Navbar from './components/index';
import { routes } from './routes';


function App() {
  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 overflow-y-auto scrollHide">
      <Navbar />
      <Routes>
        {routes.map(({path, element}) =>
          <Route key={path} path={path} element={element} exact/>
        )}
      </Routes>
    </div>
  );
}

export default App;