export type LoginResponse = {
    token: string;
    user: UserLogin;

}

export type LoginRequest = {
    username: string;
    password: string;
}


export type UserLogin = {
    name: string;
    username: string;
    id?: string;
    foto?: string | null;
}
