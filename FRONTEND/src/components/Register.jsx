import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Register() {
  const navigate = useNavigate();

  // State for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/register/", { // your backend endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,   // use email as username
          first_name: firstName,
          last_name: lastName,
          password: password,
        }),
      });

      if (res.ok) {
        alert("Registered successfully!");
        navigate("/"); // redirect to login
      } else {
        const data = await res.json();
        alert("Error: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-navbar">
        <h2>GLOBAL HOSPITALS</h2>
        <ul>
          <li>HOME</li>
          <li>ABOUT US</li>
          <li>CONTACT</li>
        </ul>
      </div>

      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-left">
            <span style={{ fontSize: "40px" }}>🩺</span>
            <h1>Welcome</h1>
          </div>

          <div className="auth-right">
            <h3>Register</h3>

            <input
              className="auth-input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="auth-input"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              className="auth-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="auth-input"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="auth-btn" onClick={handleRegister}>
              Register
            </button>

            <div className="auth-link">
              Already have an account? <a href="/">Login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
