import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import {
  login as apiLogin,
  register as apiRegister,
  changePassword as changePasswordApi,
  getProfile,
  updateProfile,
} from "../api/auth";

interface User {
  id: string;
  userName: string;
  email: string;
  role: string;
  gender: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  refreshProfile: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
  changePassword: (data: { currentPassword: string; newPassword: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("accessToken"));
  const [loading, setLoading] = useState(true);

  const login = async (data: any) => {
    const res = await apiLogin(data);
    setToken(res.data.accessToken);
    localStorage.setItem("accessToken", res.data.accessToken);
    await refreshProfile(res.data.accessToken);
  };

  const register = async (data: any) => {
    const res = await apiRegister(data);
    setToken(res.data.accessToken);
    localStorage.setItem("accessToken", res.data.accessToken);
    await refreshProfile(res.data.accessToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("accessToken");
  };

  const updateUser = async (data: Partial<User>) => {
    if (!token) return;
    await updateProfile(data, token);
    await refreshProfile(); // fetch latest profile from backend
  };

  const changePassword = async (data: { currentPassword: string; newPassword: string }) => {
    if (!token) return;
    await changePasswordApi(data, token);
  };

  const refreshProfile = async (tokenParam?: string) => {
    try {
      const t = tokenParam || token;
      if (!t) return;
      const res = await getProfile(t);
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    if (token) refreshProfile();
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout, refreshProfile, updateUser, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};
