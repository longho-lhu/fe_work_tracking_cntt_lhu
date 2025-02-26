'use client';
import { IUserData } from "@/ts/interface";
import { TUser } from "@/ts/type";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const AuthContext = createContext<IUserData | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<TUser | null>(null);
    const [token, setToken] = useState<string>('');
    useEffect(() => {
        const initToken = localStorage.getItem('wt-accessToken');
        const initUser = localStorage.getItem('wt-userData');
        initUser && localStorage.setItem('wt-userData', JSON.stringify(initUser));
        localStorage.setItem('wt-accessToken', initToken || '');
    }, [])
    function updateToken(token: string) {
        if (token) {
            setToken(token);
            localStorage.setItem('wt-accessToken', token);
        } else {
            setToken("");
            localStorage.setItem('wt-accessToken', '');
        }
    }
    function updateUser(userData: TUser | null) {
        if (userData !== null) {
            setUser(userData);
            localStorage.setItem('wt-userData', JSON.stringify(userData));
        } else {
            setUser(null);
            localStorage.setItem('wt-userData', '');
        }
    }
    function deleteTokenAndUser() {
        setToken('')
        setUser(null)
        localStorage.setItem('wt-userData', '');
        localStorage.setItem('wt-accessToken', '');
    }
    return (
        <AuthContext.Provider value={{ user, updateUser, token, updateToken, deleteTokenAndUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;
