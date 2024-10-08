import React, { useState, useContext } from 'react'
import { UserContext } from '../../context/AuthContext';
import { UserLogin } from '../../core/client/UserLogin';
import { useNavigate } from 'react-router-dom';
import { UserLoginService } from '../../services/AuthService';

const Login = () => {
    const [input, setInput] = useState({
        userNameOrEmail: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState("");
    const [focusedInput, setFocusedInput] = useState("");
    const { UserLoginContext } = useContext(UserContext);
    const [error, setError] = useState(null);
    const { userNameOrEmail, password } = input;
    const navigate = useNavigate();

    const HandleFocus = (inputName) => { setFocusedInput(inputName); };
    const HandleBlur = () => { setFocusedInput(""); };

    const HandleInput = (event) => { setInput((prev) => ({...prev, [event.target.name]: event.target.value})); };
    const HandleLogin = async (event) => { await UserLoginService(event, input, navigate, UserLoginContext, setError) }

    return (
        <UserLogin 
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