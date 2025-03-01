"use client";

import { IUserData } from "@/ts/interface";
import { TUser } from "@/ts/type";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect, useLayoutEffect, useState } from "react";

const AuthContext = createContext<IUserData | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<TUser | null>(null);
    const [token, setToken] = useState<string>("");
    const router = useRouter();

    useLayoutEffect(() => {
        const initToken = localStorage.getItem("wt-accessToken");
        const initUser = localStorage.getItem("wt-userData");
        console.log(initToken)
        setUser(initUser ? JSON.parse(initUser) : null);
        setToken(initToken || "");
    }, []);

    function updateToken(newToken: string) {
        setToken(newToken);
        localStorage.setItem("wt-accessToken", newToken);
    }

    function updateUser(userData: TUser | null) {
        setUser(userData);
        localStorage.setItem("wt-userData", userData ? JSON.stringify(userData) : "");
    }

    function deleteTokenAndUser() {
        setToken("");
        setUser(null);
        localStorage.removeItem("wt-userData");
        localStorage.removeItem("wt-accessToken");
        router.push('/auth/login');
    }

    return (
        <AuthContext.Provider value={{ user, token, updateUser, updateToken, deleteTokenAndUser }}>
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
