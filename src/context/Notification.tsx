'use client';
import { INotification } from "@/ts/interface";
import { TNotification } from "@/ts/type";
import { notification } from "antd";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const NotiContext = createContext<INotification | undefined>(undefined);

const NotiProvider = ({ children }: { children: ReactNode }) => {
    const [api, contextHolder] = notification.useNotification();


    function showNoti({ title, message, type }: TNotification) {
        switch (type) {
            case 'success':
                api.success({
                    message: title,
                    description: message,
                    showProgress: true,
                    pauseOnHover: true,
                });
                break;
            case 'info':
                api.info({
                    message: title,
                    description: message,
                    showProgress: true,
                    pauseOnHover: true,
                });
                break;
            case 'error':
                api.error({
                    message: title,
                    description: message,
                    showProgress: true,
                    pauseOnHover: true,
                });
                break;
            default:
                api.open({
                    message: title,
                    description: message,
                    showProgress: true,
                    pauseOnHover: true,
                });
        }
    }
    return (
        <NotiContext.Provider value={{ showNoti }}>
            {contextHolder}
            {children}
        </NotiContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotiContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default NotiProvider;