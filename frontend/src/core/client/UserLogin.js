import { Link } from "react-router-dom"
import Logo from '../../assets/img/vphuoc.png'

const UserLogin = ({
    // Input
    userNameOrEmail,
    password,
    HandleInput,

    // Show password
    showPassword,
    setShowPassword,

    // Focused input effect
    focusedInput,
    HandleFocus,
    HandleBlur,

    // Error
    error,

    // Login
    HandleLogin,

    // Identify
    identify,
    setIdentify,
    identifyBox,
    HandleIdentifyBox,
    HandleCloseIdentifyBox,
    HandleIdentify,
    HandleNotMe,

    // Otp
    otp,
    setOtp,
    showOTPBox,
    setShowOTPBox,
    HandleSendOTPResetPassword,
    HandleOTPVerification,
    errorVerifyEmail,
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
                <p className = "ForgottenPassword" onClick = { HandleIdentifyBox }>Forgotten password?</p>
            </form>
            
            {identifyBox && <div className = "box"></div>}
            {identifyBox && (
                <div className = "IdentifyBox">
                    <div className = "CloseIdentifyBox" onClick = { HandleCloseIdentifyBox }>&times;</div>
                    <div className = "IdentifyInput">
                        <input 
                            name = "userNameOrEmail"
                            placeholder = "Username or email"
                            onChange = { HandleInput }
                        />
                        <i class = "fa-solid fa-magnifying-glass" onClick = { HandleIdentify }></i>
                    </div>
                    <div className = "IdentifyInfo">
                    {identify.map((identify) => (
                        <div className = "Data">
                             <table>
                                <tr>
                                    <th>Avatar</th>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                </tr>
                                <tr>
                                    <td><img src = { identify.avatar } alt = "" /></td>
                                    <td className = "Firstname"> { identify.firstname } </td>
                                    <td className = "Lastname"> { identify.lastname } </td>
                                    <td className = "Username"> { identify.username } </td>
                                    <td className = "Email"> { identify.email } </td>
                                </tr> 
                             </table>
                             <div className = "Buttons">
                                <button onClick = { HandleSendOTPResetPassword }>This is me</button>
                                <button onClick = { HandleNotMe }>Not me</button>
                             </div>
                        </div>
                    ))}
                    </div>
                </div>
            )}

            {showOTPBox && <div className = "box"></div>}
            {showOTPBox && (
                <div className = "OTPBox">
                    <p>You need to enter the OTP code to confirm your email to proceed with password reset.</p>
                    <input 
                        type = "text" 
                        placeholder = "Otp code" 
                        value = { otp }
                        onChange = {(e) => setOtp(e.target.value)}
                    />
                    { errorVerifyEmail && <p className = "Error">{ errorVerifyEmail }</p> }
                    <div className = "Buttons">
                        <button onClick = { HandleOTPVerification }>Confirm</button>
                        <button onClick = { () => { setShowOTPBox(false); setIdentify([]);} }>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export { UserLogin }