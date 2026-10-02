// Login.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import "../auth.styles.scss";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/auth.hooks";
import Loader from "../components/Loader";

const AreaChart = ({ data, id }) => {
  const w = 300, h = 100;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - (v / 100) * h * 0.85 - 6]);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ");
  return (
    <svg className="area" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8b5cf6" stopOpacity=".38" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L${w},${h} L0,${h} Z`} fill={`url(#${id})`} />
      <path d={line} className="area__line" />
    </svg>
  );
};

import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await handleLogin({email, password});
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to log in. Please check your credentials.");
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="login-page">
      {/* LEFT SIDE */}
      <motion.div 
        className="login-left"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
      >

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
      </motion.div>

      {/* RIGHT SIDE */}
      <motion.div 
        className="login-right"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.1 }}
      >
        <div className="dashboard-preview">
          <div className="chart-card">
            <h4>Users over time</h4>

            <div className="chart">
              <span className="y y1">1,000</span>
              <span className="y y2">500</span>
              <AreaChart id="login-chart" data={[22, 40, 30, 44, 36, 28, 52, 70, 48, 34, 60, 82]} />
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
      </motion.div>
    </div>
  );
};

export default Login;