import { DisplayAvatar } from "../../services/AvatarService"


const AboutPage = ({
    // Admin
    admin,
}) => {
    return (
        <div className = "AboutPage">
            <div className = "Avatar">
                { DisplayAvatar(admin.avatar) }
            </div>
            <div className = "VerifyIcon">
                <i class = "fa-solid fa-check"></i>
            </div>
            <div className = "Bio">
                <p>{ admin.bio }</p>
            </div>
        </div>
    )
} 

export { AboutPage }