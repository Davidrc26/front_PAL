export interface User{
    id: number;
    username: string;
    roles: Array<string>;
}

export interface UserCreate{
    username: string;
    password: string;
    roles: Array<string>;
}