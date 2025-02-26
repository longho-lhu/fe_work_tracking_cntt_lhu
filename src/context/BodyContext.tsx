'use client';
import { IBodyData } from "@/ts/interface";
import { TUser } from "@/ts/type";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const BodyContext = createContext<IBodyData | undefined>(undefined);

const BodyProvider = ({ children }: { children: ReactNode }) => {

    return (
        <BodyContext.Provider value={{}}>
            {children}
        </BodyContext.Provider>
    );
};

export const useBody = () => {
    const context = useContext(BodyContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default BodyProvider;
