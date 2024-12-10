import { DisplayAvatar } from "../../services/AvatarService"

const UserProfile = ({
    // User
    user
}) => {
    return (
        <div className = "UserProfile">
            {user ? (
                <div>
                    <h1>{ user.firstname } { user.lastname }</h1>
                    { DisplayAvatar(user.avatar) }
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export { UserProfile }