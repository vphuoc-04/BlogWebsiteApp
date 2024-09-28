import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AdminContext } from '../context/AuthContext'
import { UseAdminPrivateRoute } from "../hooks/useAuth"

const AdminAuthMiddleware = ({ children, adminRoute = false }) => {
    const { currentAdmin } = useContext(AdminContext)
    const navigate = useNavigate();
    const isChecking = UseAdminPrivateRoute(adminRoute, navigate, currentAdmin);
    return isChecking ? <></> : children;
}

export { AdminAuthMiddleware }