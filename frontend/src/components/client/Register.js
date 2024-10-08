import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserRegister } from '../../core/client/UserRegister'
import { UserRegisterService } from '../../services/AuthService';
import { IsValidEmail } from '../../services/EmailService';

const Register = () => {
    const [input, setInput] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
    })
    const [focusedInput, setFocusedInput] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { firstname, lastname, username, email, password, confirmpassword } = input;

    const HandleFocus = (inputName) => { setFocusedInput(inputName); };
    const HandleBlur = () => { setFocusedInput(""); };

    const HandleInput = (event) => { setInput((prev) => ({...prev, [event.target.name]: event.target.value})); };
    const HandleRegister = async (event) => { 
        event.preventDefault();
        if (!IsValidEmail(email)) { setError("Invalid email format!"); return; }
        await UserRegisterService(event, input, navigate, setError); 
    }

    return (
        <UserRegister 
            firstname = { firstname }
            lastname = { lastname }
            username = { username }
            email = { email }
            password = { password }
            confirmpassword = { confirmpassword }
            error = { error }
            focusedInput = { focusedInput }
            HandleFocus = { HandleFocus }
            HandleBlur = { HandleBlur }
            HandleInput = { HandleInput }
            HandleRegister = { HandleRegister }
        />
    )
}

export default Register;