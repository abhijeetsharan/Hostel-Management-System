import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import toast from 'react-toastify';
import jwtDecode from "jwt-decode";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    axios.defaults.withCredentials = true;
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(false);

    const getAuthState = async () => {
        try {
            const { data } = await axios.get(backendURL + '/api/auth/is-auth');
            if (data.success) {
                setIsLoggedin(true);
                getUserData();
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getAuthState();
    }, [])
}