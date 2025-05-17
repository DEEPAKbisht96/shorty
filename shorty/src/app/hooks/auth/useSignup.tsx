import { SignupData, SignupResponse } from "@/types/auth";
import { useApiMutation } from "../network/useApiMutation";
import { SIGNUP } from "@/network/endpoints/auth";


export const useSignup = () => {
    const {
        mutate: signup,
        data,
        isPending,
        isError,
        error,
        reset,
    } = useApiMutation<SignupResponse, SignupData>({
        url: SIGNUP,
        method: 'post',
        options: {
            onSuccess: (data) => {
                console.log('Signup successful:', data);
            },
            onError: (error) => {
                console.error('Signup error:', error);
            },
        },
    });

    return {
        signup,
        data,
        isPending,
        isError,
        error,
        reset,
    };
};