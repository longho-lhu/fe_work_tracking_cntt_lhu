export type TUser = {
    id: number;
    username: string;
    role: string;
}

export type TUserDetails = {
    id: number;
    user_code: string;
    full_name: string;
    avatar: string;
    class: string;
    email: string;
    phone: string;
    start_time: string;
    end_time: string;
    intern_count: string;
    intern_place_id: string;
    description: string;
    role_name: string;
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
