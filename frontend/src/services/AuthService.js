import axios from 'axios'
import { defaultAvatar } from '../services/AvatarService';
import moment from 'moment'
import { IsValidEmail } from './EmailService';

// Admin auth
const AdminLoginService = async (event, input, AdminLoginContext, navigate, setError) => {
    event.preventDefault();
    try {
        await AdminLoginContext(input);
        const response = await axios.post('/auth/admin/login', input);
        navigate('/admin/dashboard');
        console.log(response);
    } 
    catch(err) {
        setError(err.response.data);
    }
}

// User auth
const UserRegisterService = async (event, input, navigate, setError) => {
    event.preventDefault();
    try {
        const response = await axios.post('/user/register', {
            avatar: defaultAvatar,
            firstname: input.firstname,
            lastname: input.lastname,
            username: input.username,
            email: input.email,
            password: input.password,
            confirmpassword: input.confirmpassword,
            createdat: moment().format('YYYY-MM-DD HH:mm:ss')

        })
        navigate('/login');
        console.log(response);
    }
    catch (err) {
        if (err.response && err.response.status === 400 && err.response.data === "Account already exists!") {
            setError("Account already exists!");
        } 
        else {
            setError(err.response?.data);
        }
    }
}

const SendOTPVerificationService = async (recipientEmail, otpCode) => {
    try {
        await axios.post('/user/send-otp', { email: recipientEmail, otp: otpCode });
    } 
    catch (err) {
        console.error("Error sending OTP: ", err);
        throw new Error("Failed to send OTP.");
    }
};

const UserLoginService = async (event, input, navigate, UserLoginContext, setError) => {
    event.preventDefault();
    try {
        await UserLoginContext(input);
        const response = await axios.post('/auth/user/login', input);
        navigate('/');
        console.log(response);
    } 
    catch(err) {
        setError(err.response.data);
    }
}

const SendOTPResetService = async (identify, otpCode) => {
    try {
        let emailToSend;
        if (IsValidEmail(identify)) { emailToSend = identify; }
        else {
            const response = await axios.get(`/user/get/email?username=${identify}`);
            emailToSend = response.data.email;
        }
        await axios.post('/user/reset/password', { 
            email: emailToSend, 
            otp: otpCode 
        });
    }
    catch (err) {
        console.error("Error sending OTP: ", err);
        throw new Error("Failed to send OTP.");
    }
}

export { 
    AdminLoginService,
    UserRegisterService,
    UserLoginService,
    SendOTPVerificationService,
    SendOTPResetService
}