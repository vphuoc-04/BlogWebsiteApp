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
    HandleDeleteAdminAvatar,

    // Edit profile
    editProfile,
    HandleEditProfileBox,
    HandleCloseEditProfileBox,
    newInput,
    IsDataChange,
    HandleEditProfileChange,
    focusedInput,
    HandleFocus,
    HandleBlur,
    HandleEditAdminProfile,

    // Email Setting
    emailSetting,
    HandleEmailSettingBox,
    HandleCloseEmailSettingBox
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
            <div className = "Bio">
                <p> { admin.bio } </p>
            </div>
            <div className = "AdminInfo">
                <div className = "FullName">
                    <p> { admin.firstname } </p>
                    <p> { admin.lastname } </p>
                </div>
                <div className = "Username">
                    <p> { admin.username } </p>
                </div>
                <div className = "Actions">
                    <div className = "EditProfile" onClick = { HandleEditProfileBox }>
                        <button>
                            <i class = "fa-solid fa-user-pen"></i>Edit Profile
                        </button>
                    </div>
                    <div className = "EmailSetting">
                        <button onClick = { HandleEmailSettingBox }>
                            <i class = "fa-solid fa-envelope"></i>Email
                        </button>
                    </div>
                </div>
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
            {editProfile && <div className = "overlay"></div> }
            {editProfile && (
                <div className = "BoxEditProfile">
                    <div className = "CloseBoxEditProfile" onClick = { HandleCloseEditProfileBox }>&times;</div>
                    <div className = "AdminInfoInput">
                        <p>First name</p>
                        <input 
                            name = "firstname"
                            placeholder = "First name"
                            onChange = { HandleEditProfileChange }
                            value = { newInput.firstname }
                            onFocus = {() => HandleFocus("firstname")}
                            onBlur = { HandleBlur }
                            className = { focusedInput === "firstname" ? "focused" : "" }
                        />
                        <p>Last name</p>
                        <input 
                            name = "lastname"
                            placeholder = "Last name"
                            onChange = { HandleEditProfileChange }
                            value = { newInput.lastname }
                            onFocus = {() => HandleFocus("lastname")}
                            onBlur = { HandleBlur }
                            className = { focusedInput === "lastname" ? "focused" : "" }
                        />
                        <p>Username</p>
                        <input 
                            name = "username"
                            placeholder = "Username"
                            onChange = { HandleEditProfileChange }
                            value = { newInput.username }
                            onFocus = {() => HandleFocus("username")}
                            onBlur = { HandleBlur }
                            className = { focusedInput === "username" ? "focused" : "" }
                        />
                        <p>Bio</p>
                        <textarea 
                            name = "bio"
                            placeholder = "Bio"
                            onChange = { HandleEditProfileChange }
                            value = { newInput.bio } 
                            onFocus = {() => HandleFocus("bio")}
                            onBlur = { HandleBlur }
                            className = { `Bio ${ focusedInput === "bio" ? "focused" : "" }` }
                        />
                    </div>
                    <button 
                        className = { IsDataChange() ? "Active-Save-Profile-Button" : "" }
                        disabled = { !IsDataChange() }
                        onClick = { HandleEditAdminProfile }
                    >
                        Save
                    </button>
                </div>
            )}

            {emailSetting && <div className = "overlay"></div>}
            {emailSetting && (
                <div className = "EmailSettingBox">
                    <div className = "CloseEmailSettingBox" onClick = { HandleCloseEmailSettingBox }>&times;</div>
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