import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null); // Asegurar que no haya residuos de datos
        }
    }, []);

    const login = (userData) => {
        if (!userData.token) {
            console.error("❌ No hay token en el login");
            return;
        }
        
        console.log("📌 Guardando usuario en localStorage:", userData);
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); 
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user"); 
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
