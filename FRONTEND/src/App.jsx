import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Auth from "./components/Auth";
import Dashboard from "./components/dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN / REGISTER */}
        <Route
          path="/"
          element={<Auth setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* DASHBOARD (PROTECTED) */}
        <Route
          path="/Dashboard"
          element={
            isLoggedIn ? <Dashboard /> : <Navigate to="/" />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
