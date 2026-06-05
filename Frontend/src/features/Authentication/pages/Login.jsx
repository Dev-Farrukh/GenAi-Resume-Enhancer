// Login.jsx
import React, { useState } from "react";
import "../auth.styles.scss";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/auth.hooks";
import Loader from "../components/Loader";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await handleLogin({email, password});
    navigate("/")
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="login-page">
      {/* LEFT SIDE */}
      <div className="login-left">

        <div className="login-card">
          <h1>Log in</h1>
          <p>Welcome back! Please enter your details.</p>

          <form onSubmit={submitHandler}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </span>
              </div>
            </div>

            <button className="signin-btn">Sign in</button>
          </form>

          <p className="signup-text">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="dashboard-preview">
          <div className="chart-card">
            <h4>Users over time</h4>

            <div className="chart">
              <div className="line line1"></div>
              <div className="line line2"></div>
              <div className="line line3"></div>
            </div>

            <div className="months">
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
              <span>Sep</span>
            </div>
          </div>

          <div className="circle-card">
            <div className="circle">
              <div className="inner-circle">
                <span>Active users</span>
                <h2>1,000</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-text">
          <h2>Get the best version of your Resume</h2>
          <p>Sign in to explore changes we've made.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;