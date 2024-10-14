import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/AuthContext';
import { NavbarComponent } from '../../core/pages/NavbarComponent'
import { UseUpdateCurrentUser } from '../../hooks/useAuth';

const Navbar = () => {
    const { currentUser, UserLogoutContext } = useContext(UserContext);
    const [user, setUser] = useState([]);
  
    UseUpdateCurrentUser(setUser, currentUser);

    // Avatar account
    const [boxAccountAvatarNavbar, setBoxAccountAvatarNavbar] = useState(null);
    const [boxHoverNavbar, setBoxHoverNavbar] = useState(null);


    // Avatar account
    const HandleClickAvatarNavbar = () => { setBoxAccountAvatarNavbar(Show => !Show); setBoxHoverNavbar(null); }

    const HandleHoverNavbarComponents = (componentName) => { setBoxHoverNavbar(componentName); };

    const HandleLeaveNavbarComponents = () => { setBoxHoverNavbar(null); };

    const navigate = useNavigate();

    const handleLogout = async () => {
        await UserLogoutContext();
        navigate('/login');
    }

    return (
        <NavbarComponent 
            user = { user }

            // Avatar account
            boxAccountAvatarNavbar = { boxAccountAvatarNavbar }
            HandleClickAvatarNavbar = { HandleClickAvatarNavbar }
            boxHoverNavbar = { boxHoverNavbar }
            HandleHoverNavbarComponents = { HandleHoverNavbarComponents }
            HandleLeaveNavbarComponents = { HandleLeaveNavbarComponents }
            handleLogout = { handleLogout }
            setBoxAccountAvatarNavbar = { setBoxAccountAvatarNavbar }
        />
    )
}

export default Navbar