import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

   return (
   <AuthContext.Provider value={{ user, loading, setUser, setLoading }}>
        {children}
    </AuthContext.Provider>
    )
}
