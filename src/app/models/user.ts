export interface User{
    id: number;
    username: string;
    roles: Array<Role>;
}

export interface UserCreate{
    username: string;
    password: string;
    roles: Array<string>;
}

export interface Role{
    id: number;
    name: string;
}