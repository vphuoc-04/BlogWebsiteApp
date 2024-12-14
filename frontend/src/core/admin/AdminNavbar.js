import Logo from '../../assets/img/vphuoc.png'
import { Link } from 'react-router-dom'
import { DisplayAdminAvatar } from '../../data/AdminData'

const AdminNavbar = ({
    admin,
    boxAccountAvatarNavbar,
    HandleClickAvatarNavbar,
    boxHoverNavbar,
    HandleHoverNavbarComponents,
    HandleLeaveNavbarComponents,
    AdminLogoutContext,
    setBoxAccountAvatarNavbar
}) => {
    return (
        <div className = "AdminNavbar">
            <a className = "AdminLogo" href = '/admin/dashboard'>
                <img src = { Logo } alt = "" />
            </a>
            <div className = "AdminAvatarNavbar">
                <div className = "Avatar"
                    onClick = { HandleClickAvatarNavbar }  
                    onMouseEnter = {() => HandleHoverNavbarComponents('avatar') }
                    onMouseLeave = { HandleLeaveNavbarComponents }>
                    { DisplayAdminAvatar(admin?.avatar) }
                </div> 
                {boxHoverNavbar === 'avatar' && (
                    <div className = "BoxHoverNavbar">
                        Account
                    </div>
                )}
                {boxAccountAvatarNavbar && (
                    <div className = "BoxAccountAvatarNavbar">
                        <div className = "Profile">
                            <Link className = "InfoProfile" to = '/admin/profile' onClick = {() => { setBoxAccountAvatarNavbar(false) } }>
                                { DisplayAdminAvatar(admin?.avatar) } 
                                <div className = "FullName">
                                    <p>{ admin?.firstname }</p>
                                    <p>{ admin?.lastname }</p>
                                </div>
                            </Link>
                        </div>
                        <Link className = "Logout" onClick = { AdminLogoutContext } to = '/admin/login'>
                            <div className = "LogoLogout">
                                <i class = "fa-solid fa-right-from-bracket"></i>
                            </div>
                            <p>Log out</p>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export { AdminNavbar }