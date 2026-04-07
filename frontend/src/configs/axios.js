import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api', // Trỏ về Nginx Gateway
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor cho Request: Đính kèm Token nếu có
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor cho Response: Xử lý tập trung lỗi từ Backend
axiosInstance.interceptors.response.use(
    (response) => {
        return response.data; // Trả về data trực tiếp (theo chuẩn response helper của bạn)
    },
    (error) => {
        // Log lỗi hoặc xử lý 401 Unauthorized tại đây nếu cần
        const status = error.response ? error.response.status : null;

        if (status === 401) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }

        return Promise.reject(error.response ? error.response.data : error);
    }
);

export default axiosInstance;

