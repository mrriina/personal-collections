// import Login from './pages/Login';
// import Registration from './pages/Registration';
// import Home from './pages/Home';
// import Profile from './pages/Profile'
// import Collection from './pages/Collection';
// import Item from './pages/Item';
import { Login, Registration, Home, Profile, Collection, Item } from './pages/index'
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, PROFILE_ROUTE, COLLECTION_ROUTE, ITEM_ROUTE } from './utils/consts'

export const routes = [
    {
        path: HOME_ROUTE,
        element: <Home />
    },
    {
        path: LOGIN_ROUTE,
        element: <Login />
    },
    {
        path: REGISTRATION_ROUTE,
        element: <Registration />
    },
    {
        path: PROFILE_ROUTE,
        element: <Profile />
    },
    {
        path: COLLECTION_ROUTE + '/:id',
        element: <Collection />
    },
    {
        path: ITEM_ROUTE + '/:id',
        element: <Item />
    },
]