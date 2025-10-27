// src/api/adminApi.ts
import axios from "axios";

const adminApi = axios.create({
  baseURL: "http://localhost:5255/api/Admin",
  withCredentials: true,
});

export const getAllUsers = (token: string) =>
  adminApi.get("/users", { headers: { Authorization: `Bearer ${token}` } });

export const deleteUser = (id: string, token: string) =>
  adminApi.delete(`/user/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export default adminApi;
