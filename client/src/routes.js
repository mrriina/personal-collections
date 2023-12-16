import Login from './pages/Login';
import Registration from './pages/Registration';
import Home from './pages/Home';
import Profile from './pages/Profile'
import Collection from './pages/Collection';
import Item from './pages/Item';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, PROFILE_ROUTE, COLLECTION_ROUTE, ITEM_ROUTE } from './utils/consts'

export const routes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: COLLECTION_ROUTE + '/:id',
        Component: Collection
    },
    {
        path: ITEM_ROUTE + '/:id',
        Component: Item
    },
]