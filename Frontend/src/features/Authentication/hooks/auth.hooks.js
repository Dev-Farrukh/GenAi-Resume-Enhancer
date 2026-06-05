import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../services/auth.services";

export const useAuth = () => {
    const { user, loading, setUser, setLoading } = useContext(AuthContext);

    const handleLogin = async ({email, password}) => {
        try {
            setLoading(true);
            const userData = await loginUser({ email, password });
            setUser(userData);

        } catch (error) {
            console.error("Error logging in user", error);
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async (username, email, password) => {
        try {
            setLoading(true);
            const userData = await registerUser({ username, email, password });
            setUser(userData);
            
        } catch (error) {
            console.error("Error registering user", error);
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        try {
            setLoading(true);
            await logoutUser();
            setUser(null);
        } catch (error) {
            console.error("Error logging out user", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=> {
        const handleGetuser = async () => {
        try {
            setLoading(true);
            const userData = await getCurrentUser();
            setUser(userData);
        } catch (error) {
            console.error("Error fetching current user", error);
        } finally {
            setLoading(false);
        } 
    }
    handleGetuser();
    },[])

    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout,
    }

}