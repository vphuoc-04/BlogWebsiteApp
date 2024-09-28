import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'

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

export { UseAdminPrivateRoute }