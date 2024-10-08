import { Link } from "react-router-dom"
import Logo from '../../assets/img/vphuoc.png'

const UserLogin = ({
    userNameOrEmail,
    password,
    showPassword,
    setShowPassword,
    focusedInput,
    HandleFocus,
    HandleBlur,
    error,
    HandleInput,
    HandleLogin,
}) => {
    return (
        <div className = "UserLogin">
            <div className = "Introduce">
                <h1>Welcome To My Website</h1>
                <a href = "/">
                    <img src = { Logo } alt = "" />
                </a>
            </div>
            <form>
                <h1>Login</h1>
                <div className = "InputUsernameOrEmail">
                    <input 
                        name = "userNameOrEmail"
                        type = "text"
                        placeholder = "Username or email"
                        onChange = { HandleInput }
                        onFocus = { () => HandleFocus("userNameOrEmail")} 
                        onBlur = { HandleBlur } 
                        className = { focusedInput === "userNameOrEmail" ? "focused" : "" }
                    />
                </div>
                <div className = "InputPassword">
                    <input 
                        name = "password"
                        type = { showPassword ? "text" : "password" }
                        placeholder = "Password"
                        onChange = { HandleInput }
                        onFocus = { () => HandleFocus("password")} 
                        onBlur = { HandleBlur } 
                        className = { focusedInput === "password" ? "focused" : "" }
                    />
                    <div className = "ShowOrHidePassword">
                        <i 
                            className = { showPassword === true ? "fa-regular fa-eye" : "fa-regular fa-eye-slash" } 
                            onClick = {() => setShowPassword(!showPassword) }
                        />
                    </div>
                </div>
                { error && <p className = "Error">{ error }</p> }
                <button
                    className = { userNameOrEmail && password ? "Active-User-Login-Button" : "" }
                    disabled = { userNameOrEmail && password ? false : true }
                    onClick = { HandleLogin }
                    >Login
                </button>
                <Link className = "Register" to = '/register' >Don't have an account?</Link>
                <p className = "ForgottenPassword">Forgotten password?</p>
            </form>
        </div>
    )
}

export { UserLogin }