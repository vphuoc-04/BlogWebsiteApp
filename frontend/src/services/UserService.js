import { IsValidEmail } from "./EmailService";
import axios from "axios";
import { defaultAvatar } from "./AvatarService";

const IsValidUserInput = async (input, setError) => {
    if (input.username === "vphuoc.04") {
        setError("You cannot register with this email/username.");
        return false;
    }

    if (input.email === "vanphuoc240904@gmail.com") {
        setError("You cannot register with this email/username.");
        return false;
    }

    if (!IsValidEmail(input.email)) { 
        setError("Invalid email format!"); 
        return false; 
    }

    if (input.password !== input.confirmpassword) {
        setError("Passwords do not match!");
        return false;
    }
    
    try {
        const checkResponse = await axios.post('/user/check-email-username', {
            email: input.email,
            username: input.username,
        });
        if (checkResponse.data.exists) {
            setError("Email or username already exists!");
            return false; 
        }
    } 
    catch (err) {
        setError("Error checking email or username.");
        return false; 
    }

    return true; 
};

const UserIdentify = async (input , setError, setIdentify) => {
    try {
        const response = await axios.post('/user/identify', {
            userNameOrEmail: input.userNameOrEmail,
        })
        setIdentify(response.data);
    }
    catch (err) {
        setError(err.response.data);
    }
}

const ResetPassword = async (input, setError, currentUser) => {
    try {
        await axios.put(`/user/update/new/password/${currentUser?.id}`, {
            usernameOrEmail: input.userNameOrEmail, 
            newPassword: input.newpassword 
        });
        return { success: true }
    }
    catch (err) {
        setError(err.response.data);
        return { success: false }
    }
}

const GetUser = async (setUser) => {
    try {
        const response = await axios.get('/user/data');
        setUser(response.data);
    }
    catch (err) {
        console.log(err);
    }
}

const GetUserByUsername = async (username, setUser) => {
    try {
        const response = await axios.get(`/user/data/${username}`)
        setUser(response.data);
    }
    catch(err) {
        console.log(err);
    }
}

const UploadUserAvatar = async (file, currentUser, setCurrentUser) => {
    try {
        const imageData = new FormData();
        imageData.append("file", file);
        const avatarResponse = await axios.post("/user-avatar", imageData);
        const avatarProfile = avatarResponse.data;

        if (avatarProfile) {
            const response = await axios.put(`/user/update/profile/avatar/${currentUser?.id}`, {
                avatar: avatarProfile,
            });
            const message = response.data || "Avatar has been updated";
            const updated = { ...setCurrentUser, avatar: avatarProfile };
            localStorage.setItem("user", JSON.stringify(updated));
            setCurrentUser(prevUser => ({ ...prevUser, avatar: avatarProfile }));
            console.log(message);
        }
    } 
    catch (err) {
        console.log(err);
    }
}

const DeleteUserAvatar = async (currentUser, setCurrentUser) => {
    try {
        const response = await axios.put(`/user/delete/profile/avatar/${currentUser?.id}`, {
            avatar: defaultAvatar
        });
        const message = response.data || "Avatar has been deleted";
        const updated = { ...setCurrentUser, avatar: defaultAvatar };
        localStorage.setItem("user", JSON.stringify(updated));
        setCurrentUser(prevUser => ({ ...prevUser, avatar: defaultAvatar }));
        console.log(message);
    }
    catch (err) {
        console.log(err);
    }
}

export { 
    IsValidUserInput,
    UserIdentify,
    ResetPassword,
    GetUser,
    GetUserByUsername,
    UploadUserAvatar,
    DeleteUserAvatar
};
