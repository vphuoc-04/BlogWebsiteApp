import { FaCamera } from 'react-icons/fa';
import CropAvatar from 'react-avatar-edit' 
import { DisplayAvatar } from '../../services/AvatarService';
import { defaultAvatar } from '../../data/AdminData';

const AdminProfile = ({
    admin,

    // Error
    error,

    // Success
    success,

    // Successfully notification
    successfully,

    // Waring box
    warning,
    HandleWarningConfirm,
    HandleWarningCancel,

    // Verify box
    verify,
    HandleVerifyConfirm,
    HandleVerifyCancel,

    // Data change
    HandleInputChange,
    IsDataChange,

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
    focusedInput,
    HandleFocus,
    HandleBlur,
    HandleEditAdminProfile,

    // Email Setting
    emailSetting,
    HandleEmailSettingBox,
    HandleCloseEmailSettingBox,
    editPrimaryEmail,
    isClicked,
    HandleEditPrimaryEmail,
    HandleCloseEditPrimaryEmail,
    IsEmailChange,
    HandleSaveEditPrimaryEmail,
    verifyPassword,
    setVerifyPassword,
    showPassword,
    setShowPassword,
    addBackupEmail,
    HandleAddBackupEmailBox,
    IsBackupEmailValid,
    IsBackupEmailChange,
    HandleCloseBacupEmailBox,
    HandleAddBackupEmail,
    backupEmailAction,
    HandleBackupEmailActionBox,
    HandleDeleteBackupEmail,
    HandleSetPrimaryBackupEmail,
    HandleDeletePrimaryEmail,

    // Password setting
    passwordSetting,
    HandlePasswordSettingBox,
    HandleClosePassowrdSettingBox,
    IsPasswordChange,
    HandleChangePassword
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
                    <div className = "PasswordSetting">
                        <button onClick = { HandlePasswordSettingBox }>
                            <i class = "fa-solid fa-lock"></i>Password
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
                            onChange = { HandleInputChange }
                            value = { newInput.firstname }
                            onFocus = {() => HandleFocus("firstname")}
                            onBlur = { HandleBlur }
                            className = { focusedInput === "firstname" ? "focused" : "" }
                        />
                        <p>Last name</p>
                        <input 
                            name = "lastname"
                            placeholder = "Last name"
                            onChange = { HandleInputChange }
                            value = { newInput.lastname }
                            onFocus = {() => HandleFocus("lastname")}
                            onBlur = { HandleBlur }
                            className = { focusedInput === "lastname" ? "focused" : "" }
                        />
                        <p>Username</p>
                        <input 
                            name = "username"
                            placeholder = "Username"
                            onChange = { HandleInputChange }
                            value = { newInput.username }
                            onFocus = {() => HandleFocus("username")}
                            onBlur = { HandleBlur }
                            className = { focusedInput === "username" ? "focused" : "" }
                        />
                        <p>Bio</p>
                        <textarea 
                            name = "bio"
                            placeholder = "Bio"
                            onChange = { HandleInputChange }
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
                    <div className = "PrimaryEmail">
                        <p>Primary email</p>
                        <div className = "content">
                            <div className = "Input"> {admin.email} </div>
                            <button className = {`Edit ${ isClicked ? "isClicked" : "" }`} onClick = { HandleEditPrimaryEmail }>Edit</button>
                            <button className = "Delete" onClick = { HandleDeletePrimaryEmail }>Delete</button>
                        </div>
                        <div className = "EditPrimaryEmail">
                            {editPrimaryEmail && (
                                <div className = "EditPrimaryEmailBox">
                                    <p>Edit primary email</p>
                                    <input 
                                        name = "editemail"
                                        placeholder = "Primary email"
                                        onChange = { HandleInputChange }
                                        onFocus = {() => HandleFocus("editemail")}
                                        onBlur = { HandleBlur }
                                        className = { focusedInput === "editemail" ? "focused" : "" }
                                    />
                                    <div className = "Buttons">
                                        <button 
                                            className = { IsEmailChange() ? "Active-button-save-edit-primary-email" : "" }
                                            disabled = { !IsEmailChange() }
                                            onClick = { HandleSaveEditPrimaryEmail }
                                            >Save
                                        </button>
                                        <p onClick = { HandleCloseEditPrimaryEmail }>Cancel</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className = "AddBackupEmail">
                        <button onClick = { HandleAddBackupEmailBox } disabled = { !!admin.backupemail }>Add backup email</button>
                    </div>
                    <div className = "BackupEmailTitle">Backup email</div>
                    {admin.backupemail && (
                        <div className = "BackupEmailData" key = {admin.backupemail}> 
                            <p> { admin.backupemail } <i class = "fa-solid fa-chevron-down" onClick = { HandleBackupEmailActionBox }></i></p>
                        </div>   
                    )}    
                    {backupEmailAction && (
                        <div className = "BackupEmailActionBox">
                            <span onClick = { HandleSetPrimaryBackupEmail }>Set primary</span>
                            <span onClick = { HandleDeleteBackupEmail }>Delete</span>
                        </div>
                    )}
                </div>
            )}

            {addBackupEmail && <div className = "box"></div>}
            {addBackupEmail && (
                <div className = "AddBackupEmailBox">
                    <p>Enter the backup email address you want to add:</p>
                    <input 
                        name = "backupemail"
                        placeholder = "Backup email"
                        onChange = { HandleInputChange }
                        onFocus = {() => HandleFocus("backupemail")}
                        onBlur = { HandleBlur }
                        className = { focusedInput === "backupemail" ? "focused" : "" }
                    />
                    { success && <div> { success } </div> }
                    <div className = "Buttons">
                        <button
                            className = { newInput?.backupemail && IsBackupEmailChange() && IsBackupEmailValid() ? "Active-button-add-backup-email" : "" }
                            disabled = { !IsBackupEmailValid() || !IsBackupEmailChange() || !newInput.backupemail }
                            onClick = { HandleAddBackupEmail }
                            >Add
                        </button>
                        <button onClick = { HandleCloseBacupEmailBox }>Cancel</button>
                    </div>
                </div>
            )} 

            {passwordSetting && <div className = "overlay"></div>}
            {passwordSetting && (
                <div className = "PasswordSettingBox">
                    <div className = "ClosePasswordSettingBox" onClick = { HandleClosePassowrdSettingBox }>&times;</div>
                    <div className = "PasswordSettingInput">
                        <p>Password</p>
                        <input 
                            name = "password"
                            type = "password"
                            placeholder = "Password"
                            onChange = { HandleInputChange }
                            onFocus = {() => HandleFocus("password")}
                            onBlur = { HandleBlur }
                            className = { focusedInput === "password" ? "focused" : "" }
                        />
                        <p>New Password</p>
                        <input 
                            name = "newpassword"
                            type = "password"
                            placeholder = "New passowrd"  
                            onChange = { HandleInputChange }
                            onFocus = {() => HandleFocus("newpassword")}
                            onBlur = { HandleBlur }
                            className = { focusedInput === "newpassword" ? "focused" : "" }
                        />
                        <p>Re-enter New Password</p>
                        <input 
                            name = "renewpassword"
                            type = "password"
                            placeholder = "Re-enter new password"
                            onChange = { HandleInputChange }
                            onFocus = {() => HandleFocus("renewpassword")}
                            onBlur = { HandleBlur }
                            className = { focusedInput === "renewpassword" ? "focused" : "" }
                        />
                    </div>
                    { error && <h4 className = "Error"> { error } </h4> }
                    { success && <h4 className = "Success"> { success } </h4> }
                    <button 
                        className = { IsPasswordChange() ? "Active-button-password-setting" : "" }
                        disabled = { !IsPasswordChange() }
                        onClick = { HandleChangePassword }
                        >Save
                    </button>
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

            {verify && <div className = "box"></div>}
            {verify && (
                <div className = "VerifyBox">
                    <p> { verify.message } </p>
                    <div    
                        onFocus = {() => HandleFocus("password")} 
                        onBlur = { HandleBlur } 
                        className = {`InputVerifyPassowrd ${error ? "error" : focusedInput === "password" ? "focused" : ""}`}
                    >
                        <input
                            name = "password"
                            type = { showPassword === true ? "text" : "password" }
                            placeholder = "Password"
                            value = { verifyPassword } 
                            onChange = {(e) => setVerifyPassword(e.target.value)}
                        />
                        <i 
                            className = { `ShowPassword ${showPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}` } 
                            onClick = {() => setShowPassword(!showPassword) }
                        />
                    </div>
                    { error && <h4 className = "Error"> { error } </h4> }
                    <div className = "Buttons">
                        <button onClick = { HandleVerifyConfirm }>Confirm</button>
                        <button onClick = { HandleVerifyCancel }>Cancel</button>
                    </div>
                    {successfully && (
                        <div className = "Successfully">
                            <i class = "fa-regular fa-circle-check"></i>
                            <p> { successfully.message } </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export { AdminProfile }