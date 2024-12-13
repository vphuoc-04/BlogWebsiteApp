import { FaCamera } from "react-icons/fa"
import { defaultAvatar, DisplayAvatar } from "../../services/AvatarService"

const UserProfile = ({
    // User
    user,

    // Avatar user
    avatarAction,
    HandleAvatarActionSelect,
    avatarView,
    HandleAvatarView,
    HandleCloseAvatarView,
    avatarViewAction,
    HandleAvatarViewAction,
}) => {
    return (
        <div className = "UserProfile">
            {user ? (
                <div className = "Container">
                    <div className = "Avatar">
                        <label className = "AvatarDisplay" onClick = { HandleAvatarActionSelect }>
                            <div className = "AvatarImage">
                                { DisplayAvatar(user.avatar) }
                            </div>
                            <div className = "CameraIcon">
                                <FaCamera />
                            </div>
                        </label>
                        {avatarAction && (
                            <div className = "AvatarActions">
                                <div className = "button" onClick = { HandleAvatarView }>
                                    <i className = "fa-regular fa-user"></i>&nbsp;View avatar picture
                                </div>
                            </div>
                        )}
                    </div>
                    <div className = "InfoUser">
                        <h1>{ user.firstname } { user.lastname }</h1>
                    </div>

                    {avatarView && <div className = "overlay"></div>}
                    {avatarView && (
                        <div className = "AvatarView">
                            <div className = "CloseViewAvatar" onClick = { HandleCloseAvatarView }>&times;</div>
                            <div className = "ActionViewAvatar">
                                <i 
                                    className = "fa-solid fa-ellipsis-vertical" 
                                    onClick = { user.avatar === defaultAvatar ? null : HandleAvatarViewAction }
                                    style = {{ cursor: user.avatar === defaultAvatar ? 'not-allowed' : 'pointer' }}
                                ></i>
                            </div>
                            {avatarViewAction && (
                                <div className = "ActionViewAvatarBox">
                                    <p><i class = "fa-regular fa-trash-can"></i>&nbsp;Delete</p>
                                </div>
                            )}
                            <div className = "Avatar">
                                { DisplayAvatar(user.avatar) }
                            </div>
                        </div>
                    )}

                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export { UserProfile }