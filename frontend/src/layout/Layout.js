import AdminLogin from '../components/admin/Login'

import { createBrowserRouter } from 'react-router-dom'
import Admin from '../components/admin/Admin'
import Dashboard from '../components/admin/Dashboard'

const AdminLayout = () => {
    return (
        <>
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