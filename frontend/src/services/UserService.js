import { IsValidEmail } from "./EmailService";
import axios from "axios";

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

export { 
    IsValidUserInput,
    UserIdentify,
    ResetPassword
};
