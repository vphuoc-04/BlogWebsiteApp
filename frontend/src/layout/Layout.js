import { createBrowserRouter, Outlet } from 'react-router-dom'
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
import AdminCreatePost from '../components/admin/CreatePost'

// Client components
import UserRegister from '../components/client/Register'
import UserLogin from '../components/client/Login'

// Page
import Home from '../components/pages/Home'
import Navbar from '../components/pages/Navbar'
import Footer from '../components/pages/Footer'
import About from '../components/pages/About'


// Admin layout
const AdminLayout = () => {
    return (
        <>
            <AdminNavbar />
            <Admin />
        </>
    )
}

// Page layout
const ClientLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
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
            { path: 'profile', element: <AdminProfile /> },
            { path: 'create', element: <AdminCreatePost /> }
        ]
    },

    // Client
    { path: '/register', element: <UserAuthMiddleware userRoute = { true }> <UserRegister /> </UserAuthMiddleware> },
    { path: '/login', element: <UserAuthMiddleware userRoute = { true }> <UserLogin /> </UserAuthMiddleware> },
    {
        path: '/',
        element: <UserAuthMiddleware userRoute = { true }> <ClientLayout /> </UserAuthMiddleware>,
        children: [
            { path: '/', element: <Home /> },
            { path: '/about', element: <About /> }
        ]
    }
])


export { Layout }