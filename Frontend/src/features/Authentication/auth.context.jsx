import { createContext, useState, useEffect } from "react";
import { getCurrentUser } from "./services/auth.services";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const handleGetuser = async () => {
            try {
                setLoading(true);
                const response = await getCurrentUser();
                setUser(response?.user);
            } catch (error) {
                console.error("Error fetching current user", error);
            } finally {
                setLoading(false);
            } 
        }
        handleGetuser();
    }, []);

   return (
   <AuthContext.Provider value={{ user, loading, setUser, setLoading }}>
        {children}
    </AuthContext.Provider>
    )
}
