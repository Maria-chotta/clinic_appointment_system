import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/style.css";

function Auth({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // login | register | role
  const [role, setRole] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/accounts/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        setIsLoggedIn(true);
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch {
      alert("Server error");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMode("role"); // show role selection AFTER clicking register
  };

  const submitRegister = async (selectedRole) => {
    setRole(selectedRole);

    try {
      const res = await fetch("http://localhost:8000/accounts/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          email,
          address,
          role: selectedRole,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setIsLoggedIn(true);
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch {
      alert("Server error");
    }
  };

  return (
    <div className="auth-page">
      {/* LEFT */}
      <div className="auth-left">
        <h1>CLINIC APPOINTMENT SYSTEM</h1>
        <p>Welcome to our Clinic Appointment System</p>
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <div className="auth-form-card">

          {/* LOGIN */}
          {mode === "login" && (
            <>
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                <input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button type="submit">Login</button>
              </form>

              <p className="switch-text">
                No account?
                <span onClick={() => setMode("register")}> Register</span>
              </p>
            </>
          )}

          {/* REGISTER (same form as login) */}
          {mode === "register" && (
            <>
              <h2>Register</h2>
              <form onSubmit={handleRegister}>
                <input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                

                <button type="submit">Register</button>
              </form>

              <p className="switch-text">
                Already have an account?
                <span onClick={() => setMode("login")}> Login</span>
              </p>
            </>
          )}

          {/* ROLE SELECTION (ONLY AFTER REGISTER CLICK) */}
          {mode === "role" && (
            <>
              <h2>Select your role</h2>
              <div className="role-switch">
                {["Patient", "Doctor", "Admin"].map((r) => (
                  <button
                    key={r}
                    onClick={() => submitRegister(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default Auth;
