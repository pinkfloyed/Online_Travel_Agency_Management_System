import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useAuth } from "../../context/AuthContext";
import "./dashboard.css";

ChartJS.register(ArcElement, Tooltip, Legend);

interface BookingStatusCount {
  status: string;
  count: number;
}

interface PackageRating {
  packageId: number;
  averageRating: number;
}

interface DashboardResponse {
  totalBookings: number;
  totalPackages: number;
  totalDestinations: number;
  totalUsers: number;
  totalPayments: number;
  totalPaidPayments: number;
  bookingsPerStatus: BookingStatusCount[];
  totalRevenue: number;
  unpaidRevenue: number;
  packageRatings: PackageRating[];
}

export const Dashboard = () => {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("http://localhost:5255/api/Dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading dashboard...</p>;
  if (!data) return <p style={{ textAlign: "center", marginTop: "50px" }}>No data available.</p>;

  const pieData = {
    labels: data.bookingsPerStatus.map((b) => b.status),
    datasets: [
      {
        label: "Bookings per Status",
        data: data.bookingsPerStatus.map((b) => b.count),
        backgroundColor: [
          "#4caf50",
          "#ff9800",
          "#f44336",
          "#2196f3",
          "#9c27b0",
          "#00bcd4",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1>📊 Admin Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card"><h3>Total Bookings</h3><p>{data.totalBookings}</p></div>
        <div className="stat-card"><h3>Total Packages</h3><p>{data.totalPackages}</p></div>
        <div className="stat-card"><h3>Total Destinations</h3><p>{data.totalDestinations}</p></div>
        <div className="stat-card"><h3>Total Users</h3><p>{data.totalUsers}</p></div>
        <div className="stat-card"><h3>Total Payments</h3><p>{data.totalPayments}</p></div>
        <div className="stat-card"><h3>Paid Payments</h3><p>{data.totalPaidPayments}</p></div>
        <div className="stat-card"><h3>Total Revenue</h3><p>${data.totalRevenue}</p></div>
        <div className="stat-card"><h3>Unpaid Revenue</h3><p>${data.unpaidRevenue}</p></div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
  <h3>Bookings Per Status</h3>
  <div className="chart-container">
    <Pie
      data={pieData}
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      }}
      width={280}
      height={280}
    />
  </div>
</div>


        <div className="chart-card">
          <h3>Package Ratings</h3>
          <ul>
            {data.packageRatings.map((pkg) => (
              <li key={pkg.packageId}>
                <span>Package #{pkg.packageId}</span>
                <strong>{pkg.averageRating.toFixed(1)} ⭐</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
