export interface SignupData {
    full_name: string;
    email: string;
    password: string;
}


export interface SignupResponse {
    success: boolean,
    message: string;
    data: any
}

export interface LoginData {
    email: string;
    password: string;
}


export interface LoginResponse {
    success: boolean,
    message: string;
    data: any
}