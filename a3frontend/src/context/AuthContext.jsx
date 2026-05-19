import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("a3-token"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Check if token is expired
                if (decoded.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    // In a real app, you might want to fetch full user info from backend here
                    // For now we trust the token and local storage
                    const savedUser = localStorage.getItem("a3-user");
                    if (savedUser) {
                        setUser(JSON.parse(savedUser));
                    }
                }
            } catch (error) {
                console.error("Invalid token:", error);
                logout();
            }
        }
        setLoading(false);
    }, [token]);

    const loginWithGoogle = async (idToken) => {
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
                idToken
            });
            const { token: jwtToken, user: userData } = response.data;
            
            setToken(jwtToken);
            setUser(userData);
            localStorage.setItem("a3-token", jwtToken);
            localStorage.setItem("a3-user", JSON.stringify(userData));
            
            return { success: true };
        } catch (error) {
            console.error("Login failed:", error);
            return { success: false, error: error.response?.data || "Login failed" };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("a3-token");
        localStorage.removeItem("a3-user");
    };

    const value = {
        user,
        token,
        loading,
        loginWithGoogle,
        logout,
        isAuthenticated: !!token
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;
