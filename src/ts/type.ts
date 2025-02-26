export type TUser = {
    id: number;
    userCode: string;
    fullName: string;
}

export type TNotification = {
    title: string; message: string; type?: string;
}