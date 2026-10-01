import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Authentication/hooks/auth.hooks';
import './LandingPage.scss';
import heroImage from '../../../assets/hero.png';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGenerateClick = () => {
    navigate('/generator');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="landing-container">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="logo">
          <div className="logo-icon"></div>
          <span>GenAI Resume</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
        </div>
        <div className="nav-actions">
          {user ? (
            <button className="btn-secondary" onClick={() => navigate('/generator')}>Dashboard</button>
          ) : (
            <button className="btn-secondary" onClick={handleLoginClick}>Login</button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="hero-section">
        <div className="hero-content-centered">
          <div className="badge pulse-badge">
            <span className="badge-new">NEW</span>
            <span className="badge-text">GenAI Resume Enhancer v2.0</span>
          </div>
          
          <h1 className="hero-title-centered">
            Elevate your <span className="gradient-text">career prospects.</span>
          </h1>
          
          <p className="hero-subtitle-centered">
            Unlock the full potential of your professional profile with our AI tool, designed to streamline and simplify resume creation and ATS optimization.
          </p>

          <div className="hero-cta-centered">
            <button className="btn-primary glow-btn" onClick={handleGenerateClick}>
              Generate Resume <i className="ri-arrow-right-line"></i>
            </button>
            <p className="cta-hint"><i className="ri-lock-line"></i> Login required</p>
          </div>
        </div>

        {/* Dashboard Mockup - Now part of Hero with 3D perspective */}
        <div className="hero-dashboard-wrapper">
          <div className="dashboard-mockup perspective-3d">
            <div className="mockup-header">
              <span className="dot bg-red"></span>
              <span className="dot bg-yellow"></span>
              <span className="dot bg-green"></span>
            </div>
            <div className="mockup-body">
              {/* Sidebar */}
              <div className="mockup-sidebar">
                <div className="mockup-nav-item active"><i className="ri-dashboard-line"></i> Overview</div>
                <div className="mockup-nav-item"><i className="ri-bar-chart-line"></i> Analytics</div>
                <div className="mockup-nav-item"><i className="ri-magic-line"></i> AI Generator</div>
                <div className="mockup-nav-item"><i className="ri-file-edit-line"></i> Editor</div>
              </div>
              {/* Main Content */}
              <div className="mockup-content">
                <div className="mockup-top-bar">
                  <div className="mockup-title">Resume Overview</div>
                  <div className="mockup-search">Search...</div>
                </div>
                <div className="mockup-widgets">
                  <div className="widget">
                    <div className="widget-title">ATS Score</div>
                    <div className="widget-value">85% <span className="positive">+5%</span></div>
                    <div className="widget-chart-placeholder"></div>
                  </div>
                  <div className="widget">
                    <div className="widget-title">Keyword Match</div>
                    <div className="widget-value">32 <span className="negative">-2</span></div>
                    <div className="widget-list">
                      <div>React</div>
                      <div>Node.js</div>
                      <div>System Design</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="massive-glow"></div>
        </div>
        
        <div className="trusted-by-centered">
          <span>Trusted by top innovative professionals</span>
          <div className="company-logos">
            <div className="company-logo"><i className="ri-amazon-fill"></i> Amazon</div>
            <div className="company-logo"><i className="ri-google-fill"></i> Google</div>
            <div className="company-logo"><i className="ri-microsoft-fill"></i> Microsoft</div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="features-header">
          <div className="badge dark-badge">Everything you need</div>
          <h2>Harness the power of AI, making resume optimization intuitive and effective for all skill levels.</h2>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <i className="ri-dashboard-line"></i>
            <h3>User-friendly dashboard</h3>
            <p>Perform complex resume optimizations and edits with a single click.</p>
          </div>
          <div className="feature-card">
            <i className="ri-bar-chart-box-line"></i>
            <h3>Visual reports</h3>
            <p>Visual insights into your resume's performance and ATS score.</p>
          </div>
          <div className="feature-card">
            <i className="ri-magic-line"></i>
            <h3>Smart Keyword Generator</h3>
            <p>Automatic suggestions and the best keywords to target for your role.</p>
          </div>
          <div className="feature-card">
            <i className="ri-file-edit-line"></i>
            <h3>Content evaluation</h3>
            <p>Simple corrections for immediate improvements to your bullet points.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
