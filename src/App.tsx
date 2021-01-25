import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/auth";
import LoginPage from "./components/loginPage/LoginPage";
import AdminPage from "./components/adminPage/AdminPage";
import PrivateRoute from "./auth/PrivateRoute";

export default function App() {
  const [valid, setValid] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        valid: valid,
        setValid: setValid,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <PrivateRoute
            path="/admin"
            element={<AdminPage />}
            alternativePath="/"
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}
