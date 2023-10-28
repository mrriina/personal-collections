import { Outlet } from "react-router-dom";
import Login from "../pages/Login";


export default function LoggedInRoutes() {
    return sessionStorage.getItem('tokenUser') ? <Outlet /> : <Login />;
}