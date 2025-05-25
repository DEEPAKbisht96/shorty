import { LoginData, LoginResponse } from "@/types/auth";
import { useApiMutation } from "../network/useApiMutation";
import { LOGIN } from "@/network/endpoints/auth";
import toast from "react-hot-toast";
import { ErrorResponse } from "@/types/error_response";


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
                toast.success("welcome back");
            },
            onError: (error) => {
                toast.error((error.response?.data as ErrorResponse).error.message);
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