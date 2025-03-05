import { Dispatch, SetStateAction } from "react";
import { EBodyMenu } from "./enum";
import { TNotification, TUser } from "./type";

export interface IUserData {
    user: TUser | null;
    updateUser: (user: TUser | null) => void;
    token: string;
    updateToken: (token: string) => void;
    deleteTokenAndUser: () => void;
}

export interface IBodyData {
    menuSelected: EBodyMenu,
    setMenuSelected: Dispatch<SetStateAction<EBodyMenu>>;
}

export interface INotification {
    showNoti: ({ title, message, type }: TNotification) => void;
}