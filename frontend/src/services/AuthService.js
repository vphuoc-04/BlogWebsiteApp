import axios from 'axios'

const AdminLoginService = async (event, input, AdminLoginContext, navigate, setError) => {
    event.preventDefault();
    try{
        await AdminLoginContext(input);
        const response = await axios.post('/auth/admin/login', input);
        navigate('/admin/dashboard');
        console.log(response);
    } 
    catch(err){
        setError(err.response.data);
    }
}


export { AdminLoginService }