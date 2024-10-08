import axios from 'axios'
import { defaultAvatar } from '../data/AdminData';
import moment from 'moment'

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
        else if (input.password !== input.confirmpassword) {
            setError("Passwords do not match!");
        }
        else {
            setError(err.response?.data);
        }
    }
}

export { 
    AdminLoginService,
    UserRegisterService
}