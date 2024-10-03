import axios from "axios";
import { defaultAvatar } from "../data/AdminData";

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
            bio: newInput.bio
        });
        const message = response.data || "Profile has been updated";
        console.log(message);
    }
    catch (err) {
        console.log(err);
    }
}

export {
    UploadAdminAvatar,
    DeleteAdminAvatar,
    EditAdminProfile
}