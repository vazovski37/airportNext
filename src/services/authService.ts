import { apiPost, apiGet } from "@/utils/axiosInstance";
import {
    RegistrationData,
    RegisterResponse,
    LoginFormData,
    LoginResponse,
    IUser,
    // ForgotPasswordData,
    // ResetPasswordData,
} from "@/interfaces/auth";

// Register a new user
export const registerUser = async (data: RegistrationData): Promise<RegisterResponse> => {
    return apiPost("/api/register", data);
};

// Login a user
export const loginUser = async (data: LoginFormData): Promise<LoginResponse> => {
    return apiPost("/api/login", data);
};

// Logout user
export const logoutUser = async (): Promise<any> => {
    return apiPost("/api/logout");
};

//fetch user info
export const getUserInfo = async (): Promise<IUser> => {
    return apiGet("/api/user")
}
