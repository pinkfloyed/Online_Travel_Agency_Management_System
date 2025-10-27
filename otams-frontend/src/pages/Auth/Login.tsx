// Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form);
      navigate("/profile");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} required />
          <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form,password:e.target.value})} required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};
