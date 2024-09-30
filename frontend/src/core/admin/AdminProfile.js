import { FaCamera } from 'react-icons/fa';
import CropAvatar from 'react-avatar-edit' 

const AdminProfile = ({
    admin,

    // Admin avatar
    avatarAction,
    HandleAvatarActionSelect,
    avatarView,
    HandleAvatarView,
    HandleCloseAvatarView,
    boxEditAvatar,
    HandleSetAvatar,
    HandleCloseAvatarSettingBox,
    editAvatar,
    avatarFile,
    OnCrop
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
                        <div className = "button" onClick = {() => document.getElementById('file').click()}>
                            <i className = "fa-regular fa-image"></i>&nbsp;Select avatar picture
                        </div>
                        <input 
                            type = "file"
                            id = "file"
                            style = {{ display: 'none' }} 
                            onChange = { HandleSetAvatar }

                        />
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
            {boxEditAvatar && <div className = "overlay"></div>}
            {boxEditAvatar && (
                <div className = "BoxEditAvatar">
                    <div className = "CloseBoxEditAvatar" onClick = { HandleCloseAvatarSettingBox }>&times;</div>
                    {editAvatar && (
                        <div className = "EditAvatar">
                            <div className = "CropWrapper">
                                <div className = "AvatarOnCrop">
                                    <CropAvatar 
                                        width = {500}
                                        height = {500}
                                        onCrop = { OnCrop }
                                        src = { avatarFile }
                                        border = {50} 
                                        borderRadius = {100} 
                                        color = {[255, 255, 255, 0.6]} 
                                        scale = {1.2} 
                                    />
                                </div>
                            </div>
                            <div className = "Buttons">
                                <span onClick = { HandleCloseAvatarSettingBox }>Cancel</span>
                                <button>Save</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export { AdminProfile }