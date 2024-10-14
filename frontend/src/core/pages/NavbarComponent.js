import { NavLink, Link } from 'react-router-dom'
import Logo from '../../assets/img/vphuoc.png'
import { DisplayAvatar } from '../../services/AvatarService'

const NavbarComponent = ({
    user,

    // Avatar account
    boxAccountAvatarNavbar,
    HandleClickAvatarNavbar,
    boxHoverNavbar,
    HandleHoverNavbarComponents,
    HandleLeaveNavbarComponents,
    handleLogout,
    setBoxAccountAvatarNavbar
}) => {
    const ActiveNavbar = (isActive) => ({
        color: isActive ? 'rgb(0, 0, 0)' : 'rgb(0, 0, 0, 0.3)',
    })

    return (
        <div className = "NavbarComponent">
             <a href = '/'>
                <img src = { Logo } alt = ""/>
             </a>
             <div className = "Routes">
                <NavLink className = "Home" style = {({ isActive }) => ActiveNavbar(isActive)} to = '/'>Home</NavLink>
             </div>
             {user ? (
                <>
                    <div className = "AvatarNavbar">
                        <div className = "Avatar"
                            onClick = { HandleClickAvatarNavbar }  
                            onMouseEnter = {() => HandleHoverNavbarComponents('avatar') }
                            onMouseLeave = { HandleLeaveNavbarComponents }>
                            { DisplayAvatar(user?.avatar) }
                        </div> 
                        {boxHoverNavbar === 'avatar' && (
                            <div className = "BoxHoverNavbar">
                                Account
                            </div>
                        )}
                        {boxAccountAvatarNavbar && (
                            <div className = "BoxAccountAvatarNavbar">
                                <div className = "Profile">
                                    <Link className = "InfoProfile" to = '/profile' onClick = {() => { setBoxAccountAvatarNavbar(false) } }>
                                        { DisplayAvatar(user?.avatar) } 
                                        <div className = "FullName">
                                            <p>{ user?.firstname }</p>
                                            <p>{ user?.lastname }</p>
                                        </div>
                                    </Link>
                                </div>
                                <div className = "Logout" onClick = { handleLogout }>
                                    <div className = "LogoLogout">
                                        <i class = "fa-solid fa-right-from-bracket"></i>
                                    </div>
                                    <p>Log out</p>
                                </div>
                            </div>
                        )}
                    </div>
                </>
             ) : (
                <div className = "Buttons">
                    <Link className = "Login" to = '/login'>Login</Link>
                    <Link className = "Register" to = '/register'>Register</Link>
                </div>
             )}
             
        </div>
    )
}

export { NavbarComponent }