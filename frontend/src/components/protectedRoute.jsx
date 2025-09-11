//allows sending users to different pages 
import { Navigate } from 'react-router-dom';

//import auth content to verify authetications
import { useAuth } from '../context/authContext.jsx';

export default function ProtectedRoute({children}) {
    const { isAuthenticated } = useAuth() //get whetehr the user is autheticated in authContext

    if (!isAuthenticated) { //if not authenticated
        return <Navigate to="/login" replace /> //send them back to login
    }

    return children //otherwise, let them have access to the pages
} 