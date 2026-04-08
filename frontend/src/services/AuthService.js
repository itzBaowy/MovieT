import axiosInstance from "../configs/axios";

export const authService = {
  login: async (credentials) => {
    return await axiosInstance.post("/auth/login", credentials);
  },

  register: async (userData) => {
    return await axiosInstance.post("/auth/register", userData);
  },

  getProfile: async () => {
    return await axiosInstance.get("/auth/info");
  },

  updateProfile: async (data) => {
    return await axiosInstance.put("/auth/update", data);
  },
};
