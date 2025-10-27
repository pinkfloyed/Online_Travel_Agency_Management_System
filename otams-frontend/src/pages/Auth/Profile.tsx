import { useAuth } from "../../context/AuthContext";

export const Profile = () => {
  const { user } = useAuth();

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-page container mt-5">
      <div className="profile-card p-4 shadow rounded" style={{ background: "linear-gradient(135deg, #004aad, #0077ff)", color: "#fff" }}>
        <h2 className="profile-title mb-4 text-center">Your Profile</h2>

        <div className="profile-field mb-2">
          <span className="label fw-bold">User Name: </span>
          <span className="value">{user.userName}</span>
        </div>

        <div className="profile-field mb-2">
          <span className="label fw-bold">Email: </span>
          <span className="value">{user.email}</span>
        </div>

        <div className="profile-field mb-2">
          <span className="label fw-bold">Gender: </span>
          <span className="value">{user.gender}</span>
        </div>

        <div className="profile-field mb-2">
        <span className="label fw-bold">Role: </span>
        <span className="value">{user.role}</span>
      </div>

      </div>
    </div>
  );
};
