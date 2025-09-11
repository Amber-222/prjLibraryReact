//need required imports
import { createContext, useContext, useState } from 'react';

//create the section of memory first for remembering if user is logged in
const AuthContext = createContext()

export function AuthProvider({children}) { //any child object this method has to interact with
    const [isAuthenticated, setIsAuthenticated] = useState(false) //boolean variable tracking if user was authenticated and logged in

    const login = () => setIsAuthenticated(true) //no parameters for this example
    const logout = () => setIsAuthenticated(false) //no parameters for this example

    return (
        //providing ino from this context to the rest of the app to check status anywhere as needed with handling login and logout on the pages
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext) //whenever useAuth is called it will use authContext file