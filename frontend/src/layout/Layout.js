import { createBrowserRouter } from 'react-router-dom'
import AdminLogin from '../components/admin/Login'
import Admin from '../components/admin/Admin'
import Dashboard from '../components/admin/Dashboard'
import AdminNavbar from '../components/admin/Navbar'

const AdminLayout = () => {
    return (
        <>
            <AdminNavbar />
            <Admin />
        </>
    )
}

const Layout = createBrowserRouter([
    { path: '/admin/login', element: <AdminLogin /> },
    { 
        path: '/admin',
        element: <AdminLayout />,
        children: [
            { path: 'dashboard', element: <Dashboard /> },
        ]
    }
])


export { Layout }