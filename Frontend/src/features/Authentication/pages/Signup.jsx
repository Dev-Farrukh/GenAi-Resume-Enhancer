// Register.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import "../auth.styles2.scss";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/auth.hooks";
import Loader from "../components/Loader";


const Signup = () => {
  const [showPassword , setShowPassword] = useState(false);
  const [username , setUsername] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const { handleRegister , loading} = useAuth();
  const navigate = useNavigate();


  const submitHandler = async (e) => {
    e.preventDefault();
    await handleRegister(username, email, password);
    navigate("/");
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="register-page">
      {/* LEFT SIDE - IMAGE / DASHBOARD */}
      <motion.div 
        className="register-left"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="dashboard-preview">
          <div className="analytics-card">
            <div className="card-header">
              <span>Growth analytics</span>
              <div className="badge">+24%</div>
            </div>

            <div className="growth-bars">
              <div className="growth-bar h1"><span>5.5k</span></div>
              <div className="growth-bar h2"><span>7.5k</span></div>
              <div className="growth-bar h3"><span>4.5k</span></div>
              <div className="growth-bar h4"><span>9.0k</span></div>
              <div className="growth-bar h5"><span>6.5k</span></div>
            </div>
          </div>

          <div className="profile-card">
            <div className="avatar"></div>

            <div className="profile-content">
              <h4>80% Success  </h4>
              {/* <p>Your platform is growing fast.</p> */}
            </div>
          </div>
        </div>

        <div className="left-content">
          <h1>Secure your future</h1>
          <p>
            Compete in the market of thousands of users using modern tools.
          </p>
        </div>

      </motion.div>

      {/* RIGHT SIDE - REGISTER FORM */}
      <motion.div 
        className="register-right"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >

        <div className="register-card">
          <h2>Create account</h2>
          <p>Start your journey with us today.</p>

          <form onSubmit={submitHandler}>
            <div className="input-group">
              <label>User Name</label>
              <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="input-group">
              <label>Password</label>

              <div className="password-wrapper">
                <input type={showPassword ? "text" : "password"} placeholder="Create password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <span className="eye-icon" onClick={() => setShowPassword(!showPassword)} >{showPassword ? <EyeOff /> : <Eye />}</span>
              </div>
            </div>

            <div className="terms">
              <input type="checkbox" defaultChecked={true} />
              <span>
                I agree to the <strong>Terms</strong> and{" "}
                <strong>Privacy Policy</strong>
              </span>
            </div>

            <button className="create-btn">Create account</button>
          </form>

          <div className="signin-link">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;