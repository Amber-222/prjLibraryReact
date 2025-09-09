//allows sending users to different pages 
import { Navigate, useNavigate } from "react-router-dom";

//import auth content to verify authetications
import { useAuth } from "../context/authContext";

export default function Login() {
    const {login} = useAuth()
    const navigate = useNavigate()

    const handleLogin = ()  => { 
        login()
        navigate('/dashboard')
    }


    return(
        <div>
            <h1>Login Page</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
};