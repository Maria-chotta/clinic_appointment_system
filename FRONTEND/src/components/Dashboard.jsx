import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/style.css";

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayPatients: 0,
    todayAppointments: 0,
    totalDoctors: 0,
  });

  const handleLogout = () => {
    navigate("/");
  };

  // Fetch dashboard stats from backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/dashboard/")
      .then((res) => res.json())
      .then((data) => {
        setStats({
          totalPatients: data.total_patients,
          todayPatients: data.today_patients,
          todayAppointments: data.today_appointments,
          totalDoctors: data.total_doctors,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-navbar">
        <h2>Clinic Appointment System</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="dashboard-content">
        <h1>Welcome to the Clinic Appointment System</h1>

        <div className="stats-row">
          <div className="stat-card">
            <h3>Total Patients</h3>
            <p>{stats.totalPatients}</p>
          </div>
          <div className="stat-card">
            <h3>Today Patients</h3>
            <p>{stats.todayPatients}</p>
          </div>
          <div className="stat-card">
            <h3>Today Appointments</h3>
            <p>{stats.todayAppointments}</p>
          </div>
          <div className="stat-card">
            <h3>Total Doctors</h3>
            <p>{stats.totalDoctors}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
