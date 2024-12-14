import axios from "axios";
import { defaultAvatar } from '../services/AvatarService'

const UploadAdminAvatar = async (file, currentAdmin, setCurrentAdmin) => {
    try {
        const imageData = new FormData();
        imageData.append("file", file);
        const avatarResponse = await axios.post("/admin-avatar", imageData);
        const avatarProfile = avatarResponse.data;

        if (avatarProfile) {
            const response = await axios.put(`/admin/update/profile/avatar/${currentAdmin?.id}`, {
                avatar: avatarProfile,
            });
            const message = response.data || "Avatar has been updated";
            const updated = { ...currentAdmin, avatar: avatarProfile };
            localStorage.setItem("admin", JSON.stringify(updated));
            setCurrentAdmin(prevAdmin => ({ ...prevAdmin, avatar: avatarProfile }));
            console.log(message);
        }
    } 
    catch (err) {
        console.log(err);
    }
}

const DeleteAdminAvatar = async (currentAdmin, setCurrentAdmin) => {
    try {
        const response = await axios.put(`/admin/delete/profile/avatar/${currentAdmin?.id}`, {
            avatar: defaultAvatar
        });
        const message = response.data || "Avatar has been deleted";
        const updated = { ...currentAdmin, avatar: defaultAvatar };
        localStorage.setItem("admin", JSON.stringify(updated));
        setCurrentAdmin(prevAdmin => ({ ...prevAdmin, avatar: defaultAvatar }));
        console.log(message);
    }
    catch (err) {
        console.log(err);
    }
}

const EditAdminProfile = async (newInput, currentAdmin) => {
    try {
        const response = await axios.put(`/admin/edit/profile/info/${currentAdmin?.id}`, {
            firstname: newInput.firstname,
            lastname: newInput.lastname,
            username: newInput.username,
            work: newInput.work,
            bio: newInput.bio
        });
        const message = response.data || "Profile has been updated";
        console.log(message);
    }
    catch (err) {
        console.log(err);
    }
}

const EditPrimaryEmail = async (setError, setSuccess, newInput, currentAdmin, password) => {
    try {
        const response = await axios.put(`/admin/edit/profile/primary/email/${currentAdmin?.id}`, {
            email: newInput.editemail,
            password: password
        })
        const message = response.data;
        setSuccess(message);
        return { success: true };
    }
    catch (err) {
        setError(err?.response.data);
        return { success: false };
    }
}

const AddBackupEmail = async (IsBackupEmailValid, newInput, currentAdmin) => {
    if (!IsBackupEmailValid()) { return { success: false }; }
    try {
        const response = await axios.put(`/admin/add/profile/backup/email/${currentAdmin?.id}`, {
            backupemail: newInput.backupemail
        });        
        const message = response.data || "Backup email added successfully!";
        console.log(message);
        return { success: false };
    }
    catch(err) {
        console.log(err);
        return { success: false };
    }
}

const DeleteBackupEmail = async (setSuccess, setError, currentAdmin) => {
    if (!currentAdmin?.backupemail) {
        setError("No backup email to set as primary!");
        return;
    }
    try {
        const response = await axios.put(`/admin/delete/backup/email/${currentAdmin?.id}`);
        const message = response.data || "Backup email deleted successfully!";
        setSuccess(message);
    }
    catch(err) {
        setError(err.response?.data);
    }
}

const SetPrimaryBackupEmail = async (setSuccess, setError, currentAdmin, password) => {
    if (!currentAdmin?.backupemail) {
        setError("No backup email to set as primary!");
        return { success: false };
    }
    try {
        const response = await axios.put(`/admin/setprimary/profile/backup/email/${currentAdmin?.id}`, {
            email: currentAdmin.backupemail,
            backupemail: currentAdmin.email,
            password: password
        });
        const message = response.data?.message || "Backup email has been set as primary!";
        setSuccess(message);
        return { success: true };
    } 
    catch (err) {
        setError(err.response?.data || "An error occurred.");
        return { success: false };
    }
}

const DeletePrimaryEmail = async (setSuccess, setError, currentAdmin, password) => {
    if (!currentAdmin.email) {
        setError("No email to delete!")
        return { success: false };
    }
    if (!currentAdmin.backupemail) {
        setError("Add a backup email before deleting the primary email.");
        return { success: false };
    }
    try {
        const response = await axios.put(`/admin/delete/profile/primary/email/${currentAdmin?.id}`, {
            email: currentAdmin.backupemail,
            backupemail: null,
            password: password
        })
        const message = response.data || "Email was deleted successfully!";
        setSuccess(message);
        return { success: true };
    }
    catch(err) {
        setError(err.response?.data || "An error occurred.");
        return { success: false };
    }
}

const ChangePassword = async (setError, setSuccess, AdminLogoutContext, currentAdmin, password, newpassword, renewpassword) => {
    try {
        const response = await axios.put(`/admin/change/profile/password/${currentAdmin?.id}`, {
            password,
            newpassword,
            renewpassword
        })
        const message = response.data || "Psssword has been change";
        setSuccess(message);
        setError(null);
        setTimeout(() => { AdminLogoutContext(); }, 3000);
        return { success: true };
    }
    catch(err) {
        setError(err.response?.data);
        return { success: false };
    }
}

export {
    UploadAdminAvatar,
    DeleteAdminAvatar,
    EditAdminProfile,
    EditPrimaryEmail,
    AddBackupEmail,
    DeleteBackupEmail,
    SetPrimaryBackupEmail,
    DeletePrimaryEmail,
    ChangePassword
}