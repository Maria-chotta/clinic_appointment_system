import "./style.css";

function Login() {
  return (
    <div className="auth-page">

      {/* NAVBAR */}
      <div className="auth-navbar">
        <h2>GLOBAL HOSPITALS</h2>
        <ul>
          <li>HOME</li>
          <li>ABOUT US</li>
          <li>CONTACT</li>
        </ul>
      </div>

      {/* CONTENT */}
      <div className="auth-wrapper">
        <div className="auth-card">

          {/* LEFT */}
          <div className="auth-left">
            <span style={{ fontSize: "40px" }}>🚀</span>
            <h1>Welcome</h1>
          </div>

          {/* RIGHT */}
          <div className="auth-right">
            <h3>Login</h3>

            <input
              type="email"
              placeholder="Email"
              className="auth-input"
            />

            <input
              type="password"
              placeholder="Password"
              className="auth-input"
            />

            <button className="auth-btn">Login</button>

            <div className="auth-link">
              Don’t have an account? <a href="/register">Register</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
