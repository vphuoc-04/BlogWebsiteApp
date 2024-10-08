import { Link } from "react-router-dom"

const ClientRegister = ({
    firstname,
    lastname,
    username,
    email,
    password,
    confirmpassword,
    error,
    focusedInput,
    HandleFocus,
    HandleBlur,
    HandleInput,
    HandleRegister
}) => {
    return (
        <div className = "ClientRegister">
            <form>
                <h1>Register</h1>
                <div className = "FullNameInput">
                    <div className = "Firstname">
                        <p>First name</p>
                        <input 
                            name = "firstname" 
                            type = "text"
                            placeholder = "First name"
                            onChange = { HandleInput }
                            onFocus = { () => HandleFocus("firstname")} 
                            onBlur = { HandleBlur } 
                            className = { focusedInput === "firstname" ? "focused" : "" }
                        />
                    </div>
                    <div className = "Lastname">
                        <p>Last name</p>
                        <input 
                            name = "lastname" 
                            type = "text"
                            placeholder = "Last name"
                            onChange = { HandleInput }
                            onFocus = { () => HandleFocus("lastname")} 
                            onBlur = { HandleBlur } 
                            className = { focusedInput === "lastname" ? "focused" : "" }
                        />
                    </div>
                </div>
                <div className = "UsernameInput">
                    <p>Username</p>
                    <input 
                        name = "username" 
                        type = "text"
                        placeholder = "Username"
                        onChange = { HandleInput }
                        onFocus = { () => HandleFocus("username")} 
                        onBlur = { HandleBlur } 
                        className = { focusedInput === "username" ? "focused" : "" }
                    />
                </div>
                <div className = "EmailInput">
                    <p>Email</p>
                    <input 
                        name = "email" 
                        type = "text"
                        placeholder = "Email"
                        onChange = { HandleInput }
                        onFocus = { () => HandleFocus("email")} 
                        onBlur = { HandleBlur } 
                        className = { focusedInput === "email" ? "focused" : "" }
                    />
                </div>
                <div className = "PasswordInput">
                    <div className = "Password">
                        <p>Password</p>
                        <input 
                            name = "password" 
                            type = "password"
                            placeholder = "Password"
                            onChange = { HandleInput }
                            onFocus = { () => HandleFocus("password")} 
                            onBlur = { HandleBlur } 
                            className = { focusedInput === "password" ? "focused" : "" }
                        />
                    </div>
                    <div className = "ConfirmPassword">
                        <p>Confirm Password</p>
                        <input 
                            name = "confirmpassword" 
                            type = "password"
                            placeholder = "Password"
                            onChange = { HandleInput }
                            onFocus = { () => HandleFocus("confirmpassword")} 
                            onBlur = { HandleBlur } 
                            className = { focusedInput === "confirmpassword" ? "focused" : "" }
                        />
                    </div>
                </div>
                { error && <p className = "Error">{ error }</p> }
                <button 
                    className = { firstname && lastname && username && email && password && confirmpassword ? "Active-client-register-button" : "" }
                    disabled = { !firstname || !lastname || !username || !email || !password || !confirmpassword }
                    onClick = { HandleRegister }
                >Register</button>
                <Link className = "Login" to = '/login'>Already have an account?</Link>
            </form>
        </div>
    )
}

export { ClientRegister }