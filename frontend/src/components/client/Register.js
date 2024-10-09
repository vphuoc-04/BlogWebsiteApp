import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserRegister } from '../../core/client/UserRegister'
import { SendOTPService, UserRegisterService } from '../../services/AuthService';
import { IsValidUserInput } from '../../services/UserService';

const Register = () => {
    const [input, setInput] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
    })
    const { firstname, lastname, username, email, password, confirmpassword } = input;

    // Focused input
    const [focusedInput, setFocusedInput] = useState("");

    // Error
    const [error, setError] = useState(null);

    // OTP
    const [showOTPBox, setShowOTPBox] = useState(false);
    const [otp, setOtp] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState(null);
    const [errorVerifyEmail, setErrorVerifyEmail] = useState(null);

    // Navigate route
    const navigate = useNavigate();


    // Focused input
    const HandleFocus = (inputName) => { setFocusedInput(inputName); };
    const HandleBlur = () => { setFocusedInput(""); };

    // Input
    const HandleInput = (event) => { setInput((prev) => ({...prev, [event.target.name]: event.target.value})); };

    // Handle register
    const HandleRegister = async (event) => { 
        event.preventDefault();
        const isValid = await IsValidUserInput(input, setError);
        if (!isValid) return;
        try {
            const otpCode = Math.floor(100000 + Math.random() * 900000); 
            setGeneratedOtp(otpCode);
            await SendOTPService(email, otpCode);
            setShowOTPBox(true); 
            setError(null);
        }
        catch (err) {
            setErrorVerifyEmail("Failed to send OTP. Please try again.");
        }
    };

    // Handle verify email with OTP
    const HandleOTPVerification = async (event) => {
        if (otp === generatedOtp.toString()) {
            await UserRegisterService(event, input, navigate, setError);
        } 
        else {
            setErrorVerifyEmail("Incorrect OTP. Please check your email and try again.");
        }
    };

    return (
        <UserRegister 
            // Input
            firstname = { firstname }
            lastname = { lastname }
            username = { username }
            email = { email }
            password = { password }
            confirmpassword = { confirmpassword }
            HandleInput = { HandleInput }

            // Focused Input effect
            focusedInput = { focusedInput }
            HandleFocus = { HandleFocus }
            HandleBlur = { HandleBlur }

            // Error
            error = { error }
            errorVerifyEmail = { errorVerifyEmail }
            
            // OTP
            otp = { otp }
            setOtp = { setOtp }
            showOTPBox = { showOTPBox }
            setShowOTPBox = { setShowOTPBox }
            HandleOTPVerification = { HandleOTPVerification }

            // Register
            HandleRegister = { HandleRegister }
        />
    )
}

export default Register;