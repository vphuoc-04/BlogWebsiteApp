import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'

// Admin 
const UseAdminPrivateRoute = (adminRoute, navigate, currentAdmin) => {
    const { pathname: currentPath } = useLocation();
    const [isChecking, setIsChecking] = useState(true); 
    useEffect(() => {
        if (adminRoute) {
            if (currentAdmin === null) {
                if (currentPath !== '/admin/login') {
                    navigate('/admin/login', { replace: true });
                }
            }
            else {
                if (currentPath === '/admin/login' || currentPath === '/admin') {
                    navigate('/admin/dashboard', { replace: true })
                }
            }
        }
        setIsChecking(false);
    }, [adminRoute, navigate, currentPath, currentAdmin])
    return isChecking;
}

const UseUpdateCurrentAdmin = (setAdmin, currentAdmin) => {
    useEffect(() => {
        setAdmin(currentAdmin);
    }, [currentAdmin]);
}

// User
const UseUserPrivateRoute = (userRoute, navigate, currentUser) => {
    const { pathname: currentPath } = useLocation();
    const [isChecking, setIsChecking] = useState(true); 
    useEffect(() => {
        if (userRoute) {
            if (currentUser !== null) {
                if (currentPath === '/login' || currentPath === '/register') {
                    navigate('/')
                }
            }
        }
        setIsChecking(false);
    }, [userRoute, navigate, currentPath, currentUser])
    return isChecking;
}

const UseUpdateCurrentUser = (setUser, currentUser) => {
    useEffect(() => { 
        setUser(currentUser);
    }, [currentUser]);
}

export { 
    UseAdminPrivateRoute,
    UseUpdateCurrentAdmin,
    UseUserPrivateRoute,
    UseUpdateCurrentUser 
}