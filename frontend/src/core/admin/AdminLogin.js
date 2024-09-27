const AdminLogin = ({
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
        <div className = "AdminLogin">
            <div className = "Introduce">
                <h1>Welcome Back Admin</h1>
                <p>We have been waiting for you to come back to continue using us.
                <br />We are so happy to have been created by you in this world.
                <br />We wish you a good day.</p>
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
                    className = { userNameOrEmail && password ? "Active-Admin-Login-Button" : "" }
                    disabled = { userNameOrEmail && password ? false : true }
                    onClick = { HandleLogin }
                    >Login
                </button>
            </form>
        </div>
    )
}

export { AdminLogin }