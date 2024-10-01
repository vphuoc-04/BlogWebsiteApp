import axios from "axios";

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

export {
    UploadAdminAvatar
}