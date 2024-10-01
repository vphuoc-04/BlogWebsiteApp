import { FaCamera } from 'react-icons/fa';
import CropAvatar from 'react-avatar-edit' 
import { DisplayAvatar } from '../../services/AvatarService';
import { defaultAvatar } from '../../data/AdminData';

const AdminProfile = ({
    admin,

    // Waring box
    warning,
    HandleWarningConfirm,
    HandleWarningCancel,

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
    OnCrop,
    HandleUploadAdminAvatar,
    avatarViewAction,
    HandleAvatarViewAction,
    HandleDeleteAdminAvatar
}) => {
    return (
        <div className = "AdminProfile">
            <div className = "Avatar">
                <label className = "AvatarDisplay" onClick = { HandleAvatarActionSelect }>
                    <div className = "AvatarImage">
                        { DisplayAvatar(admin.avatar) }
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
                            onClick = { admin.avatar === defaultAvatar ? null : HandleAvatarViewAction }
                            style = {{ cursor: admin.avatar === defaultAvatar ? 'not-allowed' : 'pointer' }}
                        ></i>
                    </div>
                    {avatarViewAction && (
                        <div className = "ActionViewAvatarBox" onClick = { HandleDeleteAdminAvatar }>
                            <p><i class = "fa-regular fa-trash-can"></i>&nbsp;Delete</p>
                        </div>
                    )}
                    <div className = "Avatar">
                        { DisplayAvatar(admin.avatar) }
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
                                <button onClick = { HandleUploadAdminAvatar }>Save</button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {warning && <div className = "box"></div>}
            {warning && (
                <div className = "WarningBox">
                    <p> { warning.message } </p>
                    <button onClick = { HandleWarningConfirm }>Yes</button>
                    <button onClick = { HandleWarningCancel }>Cancel</button>
                </div>
            )}
        </div>
    )
}

export { AdminProfile }