"use client";

import axiosCustom from "@/services/axiosCustom";
import { IUserData } from "@/ts/interface";
import { TUser, TUserDetails } from "@/ts/type";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect, useLayoutEffect, useState } from "react";

const AuthContext = createContext<IUserData | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<TUser | null>(null);
    const [userDetails, setUserDetails] = useState<TUserDetails | null>(null);
    const [token, setToken] = useState<string>("");
    const router = useRouter();

    useLayoutEffect(() => {
        const initToken = localStorage.getItem("wt-accessToken");
        const initUser = localStorage.getItem("wt-userData");
        setUser(initUser ? JSON.parse(initUser) : null);
        setToken(initToken || "");
    }, []);
    useEffect(() => {
        (async () => {
            if (token) {
                const userDetails = await axiosCustom.get('user/details');
                setUserDetails(userDetails.data)
            }
        })();
    }, [token, user])

    function updateToken(newToken: string) {
        setToken(newToken);
        localStorage.setItem("wt-accessToken", newToken);
    }

    async function updateUser(userData: TUser | null) {
        setUser(userData);
        localStorage.setItem("wt-userData", userData ? JSON.stringify(userData) : "");
    }

    function deleteTokenAndUser() {
        setToken("");
        setUser(null);
        localStorage.removeItem("wt-userData");
        localStorage.removeItem("wt-accessToken");
        localStorage.removeItem("wt-userDetails");
        router.push('/auth/login');
    }

    return (
        <AuthContext.Provider value={{ user, token, userDetails, updateUser, updateToken, deleteTokenAndUser }}>
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
