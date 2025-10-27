// src/api/auth.ts 

import axios from "axios";

const API_URL = "http://localhost:5255/api/Auth";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, 
});

// Register
export const register = (data: any) => api.post("/register", data);

// Login
export const login = (data: any) => api.post("/login", data);

// Get profile
export const getProfile = (token: string) =>
    api.get("/profile", { headers: { Authorization: `Bearer ${token}` } });

// Update profile
export const updateProfile = (data: any, token: string) =>
    api.put("/profile", data, { headers: { Authorization: `Bearer ${token}` } });

// Change password
export const changePassword = (data: any, token: string) =>
    api.post("/change-password", data, { headers: { Authorization: `Bearer ${token}` } });

// Logout
export const logout = (refreshToken: string, token: string) =>
    api.post("/logout", { refreshToken }, { headers: { Authorization: `Bearer ${token}` } });

export default api;
