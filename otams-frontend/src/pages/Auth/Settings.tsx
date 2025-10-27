import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Settings() {
  const { user, updateUser, changePassword } = useAuth();
  const [form, setForm] = useState({
    userName: user?.userName || "",
    email: user?.email || "",
    gender: user?.gender || "Male",
    role: user?.role || "Customer",
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(form);
    alert("Profile updated successfully");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    changePassword({
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
    });
    alert("Password updated successfully");
  };

  return (
    <div className="settings-page">
      <h2 className="settings-title">Settings</h2>
      <div className="settings-grid">

        <div className="settings-card">
          <h4>Update Profile</h4>
          <form onSubmit={handleUpdate}>
            <label>User Name</label>
            <input type="text" name="userName" value={form.userName} onChange={handleChange} />

            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} />

            <label>Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <label>Role</label>
            <select name="role" value={form.role} onChange={handleChange}>
              <option>Customer</option>
              <option>Admin</option>
            </select>

            <button type="submit" className="btn-update">Update Profile</button>
          </form>
        </div>

        <div className="settings-card">
          <h4>Change Password</h4>
          <form onSubmit={handlePasswordChange}>
            <label>Current Password</label>
            <input type="password" name="currentPassword" value={form.currentPassword} onChange={handleChange} />

            <label>New Password</label>
            <input type="password" name="newPassword" value={form.newPassword} onChange={handleChange} />

            <button type="submit" className="btn-password">Change Password</button>
          </form>
        </div>

      </div>
    </div>
  );
}
