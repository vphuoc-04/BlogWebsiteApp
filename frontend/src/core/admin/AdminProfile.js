import { FaCamera } from 'react-icons/fa';

const AdminProfile = ({
    admin,

    // Admin avatar
    avatarAction,
    HandleAvatarActionSelect,
    avatarView,
    HandleAvatarView,
    HandleCloseAvatarView
}) => {
    return (
        <div className = "AdminProfile">
            <div className = "Avatar">
                <label className = "AvatarDisplay" onClick = { HandleAvatarActionSelect }>
                    <div className = "AvatarImage">
                        <img src = { admin.avatar } alt = "" />
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
            {avatarView && <div className = "overlay"></div>}
            {avatarView && (
                <div className = "AvatarView">
                    <div className = "CloseViewAvatar" onClick = { HandleCloseAvatarView }>&times;</div>
                    <div className = "ActionViewAvatar">
                        <i 
                            className = "fa-solid fa-ellipsis-vertical" 
                        ></i>
                    </div>
                    <div className = "Avatar">
                        <img src = { admin.avatar } alt = "" />
                    </div>
                </div>
            )}
        </div>
    )
}

export { AdminProfile }