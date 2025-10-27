// src/pages/Auth/AdminUsers.tsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { deleteUser, getAllUsers } from "../../api/adminApi";
import { useAuth } from "../../context/AuthContext";

interface User {
  id: string;
  name: string;
  email: string;
  gender: string;
  role: number; 
}

export const AdminUsers = () => {
  const { user, token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "Admin") return <Navigate to="/" replace />;

  const fetchUsers = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await getAllUsers(token);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id, token);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div className="loading">Loading users...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Manage Users</h2>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className={u.role === 1 ? "admin-row" : "customer-row"}>
              <td>{u.id}</td>
              <td>{u.name || "N/A"}</td>
              <td>{u.email}</td>
              <td>{u.gender}</td>
              <td>{u.role === 1 ? "Admin" : "Customer"}</td>
              <td>
                <button className="btn-delete" onClick={() => handleDelete(u.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
