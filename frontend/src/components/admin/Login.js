import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../../context/AuthContext';
import { AdminLogin } from '../../core/admin/AdminLogin';
import { AdminLoginService } from '../../services/AuthService';

const Login = () => {
    const [input, setInput] = useState({
        userNameOrEmail: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState("");
    const [focusedInput, setFocusedInput] = useState("");
    const { AdminLoginContext } = useContext(AdminContext);
    const [error, setError] = useState(null);
    const { userNameOrEmail, password } = input;
    const navigate = useNavigate();

    const HandleFocus = (inputName) => { setFocusedInput(inputName); };
    const HandleBlur = () => { setFocusedInput(""); };

    const HandleInput = (event) => { setInput((prev) => ({...prev, [event.target.name]: event.target.value})); };
    const HandleLogin = async (event) => { await AdminLoginService(event, input, AdminLoginContext, navigate, setError); };

    return (
        <AdminLogin 
            userNameOrEmail = { userNameOrEmail }
            password = { password }
            showPassword = { showPassword }
            setShowPassword = { setShowPassword }
            focusedInput = { focusedInput }
            HandleFocus = { HandleFocus }
            HandleBlur = { HandleBlur }
            error = { error }
            HandleInput = { HandleInput }
            HandleLogin = { HandleLogin }
        />
    )
}

export default Login;