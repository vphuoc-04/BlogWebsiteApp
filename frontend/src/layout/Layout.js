import { createBrowserRouter } from 'react-router-dom'
import { 
    AdminAuthMiddleware, 
    UserAuthMiddleware 
} from '../middlewares/AuthMiddleware'

// Admin components
import AdminLogin from '../components/admin/Login'
import Admin from '../components/admin/Admin'
import Dashboard from '../components/admin/Dashboard'
import AdminNavbar from '../components/admin/Navbar'
import AdminProfile from '../components/admin/Profile'

// Client components
import UserRegister from '../components/client/Register'
import UserLogin from '../components/client/Login'


// Admin layout
const AdminLayout = () => {
    return (
        <>
            <AdminNavbar />
            <Admin />
        </>
    )
}

// Client layout
const ClientLayout = () => {
    return (
        <>

        </>
    )
}

const Layout = createBrowserRouter([

    // Admin
    { path: '/admin/login', element: <AdminAuthMiddleware adminRoute = { true }> <AdminLogin /> </AdminAuthMiddleware> },
    { 
        path: '/admin',
        element: <AdminAuthMiddleware adminRoute = { true }> <AdminLayout /> </AdminAuthMiddleware>,
        children: [
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'profile', element: <AdminProfile /> }
        ]
    },

    // Client
    { path: '/register', element: <UserAuthMiddleware userRoute = { true }> <UserRegister /> </UserAuthMiddleware> },
    { path: '/login', element: <UserAuthMiddleware userRoute = { true }> <UserLogin /> </UserAuthMiddleware> },
    {
        path: '/',
        element: <UserAuthMiddleware userRoute = { true }> <ClientLayout /> </UserAuthMiddleware>,
        children: [
            
        ]
    }
])


export { Layout }