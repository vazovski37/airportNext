import { apiPost, apiGet } from "@/utils/axiosInstance";
import {
    RegistrationData,
    RegisterResponse,
    LoginFormData,
    LoginResponse,
    // ForgotPasswordData,
    // ResetPasswordData,
} from "@/interfaces/auth";

// Register a new user
export const registerUser = async (data: RegistrationData): Promise<RegisterResponse> => {
    return apiPost("/register", data);
};

// Login a user
export const loginUser = async (data: LoginFormData): Promise<LoginResponse> => {
    return apiPost("/login", data);
};

// Forgot password
// export const forgotPassword = async (data: ForgotPasswordData): Promise<any> => {
//     return apiPost("/forgot-password", data);
// };

// // Reset password
// export const resetPassword = async (data: ResetPasswordData): Promise<any> => {
//     return apiPost("/reset-password", data);
// };

// Resend email verification
export const resendEmailVerification = async (): Promise<any> => {
    return apiPost("/email/verification-notification");
};

// Logout user
export const logoutUser = async (): Promise<any> => {
    return apiPost("/logout");
};
