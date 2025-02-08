import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';


export const AppContext = createContext();

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true;

    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const getAuthState = async () => {
        try {
            const { data } = await axios.get(backendURL + '/api/admin/is-admin');
            if (data.success) {
                setIsLoggedIn(true);
                setUser(data.user)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    useEffect(() => {
        getAuthState();
    }, [])

    const value = {
        backendURL,
        isLoggedin, setIsLoggedIn,
        user, setUser
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}