import { LoginData, LoginResponse } from "@/types/auth";
import { useApiMutation } from "../network/useApiMutation";
import { LOGIN } from "@/network/endpoints/auth";


export const useLogin = () => {
    const {
        mutate: login,
        data,
        isPending,
        isError,
        error,
        reset,
    } = useApiMutation<LoginResponse, LoginData>({
        url: LOGIN,
        method: 'post',
        options: {
            onSuccess: (data) => {
                console.log('Login successful:', data);
            },
            onError: (error) => {
                console.error('Login error:', error);
            },
        },
    });

    return {
        login,
        data,
        isPending,
        isError,
        error,
        reset,
    };
};