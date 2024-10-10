import React, { useState, useContext } from 'react'
import { UserContext } from '../../context/AuthContext';
import { UserLogin } from '../../core/client/UserLogin';
import { useNavigate } from 'react-router-dom';
import { UserLoginService } from '../../services/AuthService';
import { UserIdentify } from '../../services/UserService';

const Login = () => {
    const [input, setInput] = useState({
        userNameOrEmail: "",
        password: "",
    })
    const { UserLoginContext } = useContext(UserContext);

    const { userNameOrEmail, password } = input;

    // Show password
    const [showPassword, setShowPassword] = useState("");

    // Identify account
    const [identify, setIdentify] = useState([]);
    const [identifyBox, setIndentifyBox] = useState(null);

    // Focused input
    const [focusedInput, setFocusedInput] = useState("");

    // Error
    const [error, setError] = useState(null);

    // Navigate routes
    const navigate = useNavigate();


    // Focused input
    const HandleFocus = (inputName) => { setFocusedInput(inputName); };
    const HandleBlur = () => { setFocusedInput(""); };

    // Input
    const HandleInput = (event) => { setInput((prev) => ({...prev, [event.target.name]: event.target.value})); };

    // Handle login
    const HandleLogin = async (event) => { await UserLoginService(event, input, navigate, UserLoginContext, setError) }

    // Identify 
    const HandleIdentifyBox = () => { setIndentifyBox(true); }
    const HandleCloseIdentifyBox = () => { setIndentifyBox(false); setIdentify([]); }
    const HandleIdentify = async () => { await UserIdentify(input , setError, setIdentify); setError(null) }
    const HandleNotMe = () => { setInput({}); setIdentify([]); };

    return (
        <UserLogin 
            // Input
            userNameOrEmail = { userNameOrEmail }
            password = { password }
            HandleInput = { HandleInput }

            // Show password
            showPassword = { showPassword }
            setShowPassword = { setShowPassword }

            // Focused input effect
            focusedInput = { focusedInput }
            HandleFocus = { HandleFocus }
            HandleBlur = { HandleBlur }

            // Error
            error = { error }

            // Login
            HandleLogin = { HandleLogin }

            // Identify
            identify = { identify }
            setIdentify = { setIdentify }
            identifyBox = { identifyBox }
            HandleIdentifyBox = { HandleIdentifyBox }
            HandleCloseIdentifyBox = { HandleCloseIdentifyBox }
            HandleIdentify = { HandleIdentify }
            HandleNotMe = { HandleNotMe }
        />
    )
}

export default Login;