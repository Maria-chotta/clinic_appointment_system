import { useNavigate } from "react-router-dom";

function BookAppointment() {
  const navigate = useNavigate();

  const handleBook = (e) => {
    e.preventDefault();
    alert("Appointment booked!");
    navigate("/dashboard");
  };

  return (
    <div className="auth-box">
      <h2>Book Appointment</h2>
      <form onSubmit={handleBook}>
        <input placeholder="Patient Name" required />
        <input type="date" required />
        <input type="time" required />
        <button type="submit">Book</button>
      </form>
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
      </p>
    </div>
  );
}

export default BookAppointment;
