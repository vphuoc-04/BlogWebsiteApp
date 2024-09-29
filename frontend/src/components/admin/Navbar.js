import React, { useContext, useState } from 'react'
import { AdminContext } from '../../context/AuthContext';
import { AdminNavbar } from '../../core/admin/AdminNavbar';
import { AdminData } from '../../data/AdminData';

const Navbar = () => {
    const [boxAccountAvatarNavbar, setBoxAccountAvatarNavbar] = useState(null);
    const [boxHoverNavbar, setBoxHoverNavbar] = useState(null);
    const { currentAdmin, AdminLogoutContext } = useContext(AdminContext);
    const [admin, setAdmin] = AdminData(currentAdmin);

    const HandleClickAvatarNavbar = () => { setBoxAccountAvatarNavbar(Show => !Show); setBoxHoverNavbar(null); }

    const HandleHoverNavbarComponents = (componentName) => { setBoxHoverNavbar(componentName); };
    const HandleLeaveNavbarComponents = () => { setBoxHoverNavbar(null); };

    return (
        <AdminNavbar 
            admin = { admin }
            boxAccountAvatarNavbar = { boxAccountAvatarNavbar }
            HandleClickAvatarNavbar = { HandleClickAvatarNavbar }
            boxHoverNavbar = { boxHoverNavbar }
            HandleHoverNavbarComponents = { HandleHoverNavbarComponents }
            HandleLeaveNavbarComponents = { HandleLeaveNavbarComponents }
            AdminLogoutContext = { AdminLogoutContext }
            setBoxAccountAvatarNavbar = { setBoxAccountAvatarNavbar }
        />
    )
}

export default Navbar;