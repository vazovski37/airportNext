import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const ensureCsrfCookie = async (): Promise<void> => {
    try {
        await axiosInstance.get("/sanctum/csrf-cookie");
    } catch (error) {
        console.error("Failed to fetch CSRF cookie:", error);
        throw error;
    }
};

export const apiPost = async (url: string, data?: any, p0?: { validateStatus: (status: any) => boolean; }): Promise<any> => {
    await ensureCsrfCookie();
    return axiosInstance.post(url, data).then((res) => res.data);
};

export const apiGet = async (url: string, params?: any): Promise<any> => {
    // await ensureCsrfCookie();
    return axiosInstance.get(url, { params }).then((res) => res.data);
};

export const apiPut = async (url: string, data?: any): Promise<any> => {
    return axiosInstance.put(url, data).then((res) => res.data);
};

export const apiDelete = async (url: string): Promise<any> => {
    return axiosInstance.delete(url).then((res) => res.data);
};

export default axiosInstance;
