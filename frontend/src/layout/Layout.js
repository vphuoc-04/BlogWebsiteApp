import { createBrowserRouter } from 'react-router-dom'
import { AdminAuthMiddleware } from '../middlewares/AuthMiddleware'
import AdminLogin from '../components/admin/Login'
import Admin from '../components/admin/Admin'
import Dashboard from '../components/admin/Dashboard'
import AdminNavbar from '../components/admin/Navbar'
import AdminProfile from '../components/admin/Profile'

const AdminLayout = () => {
    return (
        <>
            <AdminNavbar />
            <Admin />
        </>
    )
}

const Layout = createBrowserRouter([
    { path: '/admin/login', element: <AdminAuthMiddleware adminRoute = { true }> <AdminLogin /> </AdminAuthMiddleware> },
    { 
        path: '/admin',
        element: <AdminAuthMiddleware adminRoute = { true }> <AdminLayout /> </AdminAuthMiddleware>,
        children: [
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'profile', element: <AdminProfile /> }
        ]
    }
])


export { Layout }