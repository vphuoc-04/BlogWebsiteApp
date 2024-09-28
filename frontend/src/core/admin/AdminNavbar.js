import Logo from '../../assets/img/vphuoc.png'

const AdminNavbar = ({
    admin,
    boxAccountAvatarNavbar,
    HandleClickAvatarNavbar,
    boxHoverNavbar,
    HandleHoverNavbarComponents,
    HandleLeaveNavbarComponents
}) => {
    return (
        <div className = "AdminNavbar">
            <a className = "AdminLogo" href = '/admin/dashboard'>
                <img src = { Logo } alt = "" />
            </a>
            <div className = "AdminAvatarNavbar">
                <img 
                    src = { admin?.avatar } 
                    onClick = { HandleClickAvatarNavbar }  
                    onMouseEnter = {() => HandleHoverNavbarComponents('avatar') }
                    onMouseLeave = { HandleLeaveNavbarComponents }
                    alt = "" 
                />
                {boxHoverNavbar === 'avatar' && (
                    <div className = "BoxHoverNavbar">
                        Tài khoản
                    </div>
                )}
                {boxAccountAvatarNavbar && (
                    <div className = "BoxAccountAvatarNavbar">
                        <div className = "Profile">
                            <div className = "InfoProfile">
                                <img src = { admin?.avatar } alt = "" />
                                <div className = "FullName">
                                    <p>{ admin?.firstname }</p>
                                    <p>{ admin?.lastname }</p>
                                </div>
                            </div>
                        </div>
                        <div className = "Logout">
                            <div className = "LogoLogout">
                                <i class = "fa-solid fa-right-from-bracket"></i>
                            </div>
                            <p>Đăng xuất</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export { AdminNavbar }