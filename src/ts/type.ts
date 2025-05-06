export type TUser = {
    id: number;
    userCode: string;
    fullName: string;
}

export type TNotification = {
    title: string; message: string; type?: string;
}

export type EventType = {
    title: string;
    start: Date;
    end: Date;
    type: string;
};
