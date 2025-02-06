import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "./AppContext";

export const HostelContext = createContext();

export const HostelProvider = ({ children }) => {
    const { backendURL } = useContext(AppContext);
    const [hostels, setHostels] = useState([]);

    
    // Fetch hostels
    useEffect(() => {
        const fetchHostels = async () => {
            try {
                const { data } = await axios.get(`${backendURL}/api/hostel`);
                setHostels(data.hostels);
            } catch (error) {
                toast.error("Failed to load hostels");
            }
        };
        fetchHostels();
    }, []);

    // Create hostel with automatic room generation
    const createHostel = async (hostelData) => {
        try {
            const { data } = await axios.post(`${backendURL}/api/hostel/create`, hostelData, { withCredentials: true });

            if (data.success) {
                setHostels([...hostels, data.hostel]); // Update state
                toast.success("Hostel created successfully!");
            }
        } catch (error) {
            toast.error("Failed to create hostel");
        }
    };

    // Delete Hostel
    const deleteHostel = async (hostelId) => {
        try {
            const { data } = await axios.delete(`${backendURL}/api/hostel/${hostelId}`, {withCredentials: true});
            if (data.success) {
                setHostels(hostels.filter(h => h._id !== hostelId));
                toast.success("Hostel and rooms deleted!");
            }
        } catch (error) {
            toast.error("Failed to delete hostel");
        }
    }

    return (
        <HostelContext.Provider value={{ hostels, createHostel, deleteHostel }}>
            {children}
        </HostelContext.Provider>
    );
};
