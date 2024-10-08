import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AdminContext, UserContext } from '../context/AuthContext'
import { UseAdminPrivateRoute, UseUserPrivateRoute } from "../hooks/useAuth"

const AdminAuthMiddleware = ({ children, adminRoute = false }) => {
    const { currentAdmin } = useContext(AdminContext)
    const navigate = useNavigate();
    const isChecking = UseAdminPrivateRoute(adminRoute, navigate, currentAdmin);
    return isChecking ? <></> : children;
}

const UserAuthMiddleware = ({ children, userRoute = false }) => {
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();
    const isChecking = UseUserPrivateRoute(userRoute, navigate, currentUser);
    return isChecking ? <></> : children;
}

export { 
    AdminAuthMiddleware, 
    UserAuthMiddleware
}