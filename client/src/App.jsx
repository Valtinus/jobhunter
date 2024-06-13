import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EmployeeProfile from "./pages/EmployeeProfile";
import EmployerProfile from "./pages/EmployerProfile";
import Navbar from "./components/Navbar";
import "./index.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Job from "./pages/Job";

const App = () => {
  const [user, setUser] = useState(null);
  console.log(user)
  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <div className="container mx-auto justify-center flex mt-14">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/jobs/:id" element={<Job user={user} />} />
          <Route
            path="/users/:id"
            element={
              <ProtectedRoute
                user={user}
                requiredRole={user?.user.role === "jobseeker" ? "jobseeker" : "company"}
                element={user?.user.role === "jobseeker" ? <EmployeeProfile user={user}/> : <EmployerProfile user={user} />}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;