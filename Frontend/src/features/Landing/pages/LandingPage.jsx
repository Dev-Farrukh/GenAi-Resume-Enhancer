import { useState } from "react";
import { Link } from "react-router";
import {
  ScanSearch,
  KeyRound,
  FileCheck2,
  History,
  ShieldCheck,
  Sparkles,
  LayoutDashboard,
  Target,
  FileText,
  Search,
  Settings2,
  ArrowUpRight,
  ArrowRight,
  Play,
  CircleDot,
  Briefcase,
  Eye,
  Rocket,
  Check,
  Menu,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import heroImg from "../../../assets/hero.png";
import logo from "../../../assets/logo.png";
import Leaders from "./Leaders";
import "./LandingPage.scss";
import "./LandingSections.scss"

/* logo.png contains the icon + dark text. We crop to the icon only so it reads on dark. */
const LogoMark = ({ size = 34 }) => (
  <span className="logo-mark" style={{ width: size, height: size }}>
    <img src={logo} alt="GenAI Resume Enhancer" />
  </span>
);

const AreaChart = ({ data, id }) => {
  const w = 300,
    h = 100;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - (v / 100) * h * 0.85 - 6,
  ]);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ");
  return (
    <svg
      className="area"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
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

const sidebar = [
  { icon: LayoutDashboard, label: "Resume Overview", active: true },
  { icon: ScanSearch, label: "ATS Report" },
  { icon: KeyRound, label: "Smart Keywords" },
  { icon: Target, label: "Interview Strategy" },
  { icon: FileCheck2, label: "Content Evaluation" },
  { icon: History, label: "Report History" },
];

const missing = [
  "CI/CD pipelines",
  "GraphQL",
  "unit testing",
  "agile delivery",
  "Docker",
  "system design",
  "code review",
];

const vm = [
  {
    icon: Eye,
    label: "Our vision",
    title: "The career companion that sees the whole picture",
    text: "We want to be the ultimate AI-driven career companion. Beyond spell-checking, we match your professional profile against each job's requirements, so great candidates never slip through the cracks over fixable resume details.",
    points: [
      "Strategic insights, not just proofreading",
      "Your profile matched to every role",
      "Human potential bridged to algorithmic hiring",
    ],
  },
  {
    icon: Rocket,
    label: "Our mission",
    title: "Elite career coaching, open to everyone",
    text: "Job hunting is competitive, and the biggest hurdle is often how an ATS reads your resume, not your skills. We remove the guesswork of tailoring, so you save hours of formatting and keyword stuffing and apply with confidence.",
    points: [
      "Career coaching without the price tag",
      "Hours saved on every application",
      "Confidence to apply for dream roles",
    ],
  },
];

export default function LandingPage() {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="lp">
      <header className="nav">
        <a
          href="/"
          className="nav__logo"
          aria-label="GenAI Resume Enhancer home"
        >
          <LogoMark size={34} />
        </a>
        <nav className={`nav__links ${mobileNav ? "nav__links--open" : ""}`} aria-label="Main">
          <a href="#dashboard" onClick={() => setMobileNav(false)}>Dashboard</a>
          <a href="#features" onClick={() => setMobileNav(false)}>Features</a>
          <a href="#about" onClick={() => setMobileNav(false)}>Vision</a>
          <Link to="/login" onClick={() => setMobileNav(false)}>Sign in</Link>
        </nav>
        <div className="nav__actions">
          <Link to="/signup" className="btn btn--glow">
            Get started
          </Link>
          <button className="nav__toggle" onClick={() => setMobileNav(!mobileNav)} aria-label="Toggle menu">
            {mobileNav ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Hero  */}
      <section className="hero">
        <img className="hero__img" src={heroImg} alt="" />
        <motion.div
          className="hero__content"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.1 },
            },
          }}
        >
          <motion.span
            className="badge"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
          >
            <b>NEW</b> Powered by Qoder
          </motion.span>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
          >
            <span className="h1__dim">Elevate your resume.</span>
            <span>Beat the ATS.</span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
          >
            Unlock the full potential of your resume with our AI tool, designed
            to streamline and simplify job applications.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
          >
            <Link
              to="/signup"
              className="btn btn--glow"
              style={{
                marginTop: "12px",
                padding: "12px 28px",
                fontSize: "1rem",
                width: "fit-content",
              }}
            >
              Get started
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          className="hero__trust"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <span>Optimized for top ATS platforms</span>
          <ul>
            <li className="t1">Workday</li>
            <li className="t2">Greenhouse</li>
            <li className="t3">LEVER</li>
            <li className="t4">iCIMS</li>
          </ul>
        </motion.div>
      </section>

      {/* Dashboard  */}
      <section className="showcase" id="dashboard">
        <span className="tag">Everything you need</span>
        <h2>
          Harness the power of AI, making resume optimization intuitive and
          effective for all skill levels.
        </h2>

        <div className="window">
          <aside>
            <div className="dots">
              <i />
              <i />
              <i />
            </div>
            {sidebar.map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                className={`side ${active ? "side--active" : ""}`}
              >
                <Icon size={14} /> {label}
              </div>
            ))}
          </aside>

          <div className="main">
            <div className="main__top">
              <div>
                <strong>Resume Overview</strong>
                <small>
                  resume.pdf <ArrowUpRight size={11} />
                </small>
              </div>
              <div className="main__tools">
                <label className="search">
                  <span>Search</span>
                  <Search size={13} />
                </label>
                <button
                  className="iconbtn iconbtn--violet"
                  aria-label="AI assistant"
                >
                  <Sparkles size={16} />
                </button>
              </div>
            </div>

            <div className="main__row">
              <span className="chip">
                <Briefcase size={12} /> Frontend Developer{" "}
                <ArrowRight size={11} /> Latest
              </span>
              <button className="iconbtn" aria-label="Settings">
                <Settings2 size={14} />
              </button>
            </div>

            <div className="cards">
              <div className="card">
                <div className="card__head">
                  <span>ATS Score</span>
                </div>
                <div className="big">
                  82% <em className="up">+14%</em>
                </div>
                <div className="chart chart--sm">
                  <AreaChart
                    id="g1"
                    data={[30, 38, 34, 52, 46, 60, 55, 74, 70, 82, 76]}
                  />
                  <div className="tip">
                    <small>Version 3</small>
                    <b>78%</b>
                  </div>
                  <button className="play" aria-label="Watch demo">
                    <Play size={18} fill="currentColor" />
                  </button>
                </div>
              </div>

              <div className="card">
                <div className="card__head">
                  <span>Keywords Matched</span>
                </div>
                <div className="big">
                  24/32 <em className="down">-8 missing</em>
                </div>
                <small className="muted">Top missing keywords</small>
                <ul className="kwlist">
                  {missing.map((k) => (
                    <li key={k}>
                      <CircleDot size={12} /> {k}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card card--wide">
                <div className="card__head">
                  <span>Interview Readiness</span>
                </div>
                <div className="big">
                  91% <em className="up">+10.7%</em>
                </div>
                <div className="chart">
                  <span className="y y1">100</span>
                  <span className="y y2">50</span>
                  <AreaChart
                    id="g2"
                    data={[22, 40, 30, 44, 36, 28, 52, 70, 48, 34, 60, 82]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="feat" id="features">
        <header className="sec-head">
          <span className="tag">Features</span>
          <h2>
            Everything you need to get past the filter and into the interview.
          </h2>
        </header>

        <div className="feat__grid">
          <article className="fcard fcard--4">
            <span className="ficon">
              <Sparkles size={18} />
            </span>
            <h3>
              AI strategy generation <b className="new">New</b>
            </h3>
            <p>
              Gemini reads your PDF resume and the target job description, then
              builds a custom interview and application strategy.
            </p>
            <div className="flow" aria-hidden="true">
              <span>
                <FileText size={13} /> Resume PDF
              </span>
              <ArrowRight size={13} />
              <span>
                <Briefcase size={13} /> Job description
              </span>
              <ArrowRight size={13} />
              <span className="flow__end">
                <Sparkles size={13} /> Your strategy
              </span>
            </div>
          </article>

          <article className="fcard fcard--2">
            <span className="ficon">
              <ScanSearch size={18} />
            </span>
            <h3>ATS score reports</h3>
            <p>
              A visual dashboard shows how well your resume matches the role.
            </p>
            <ul className="bars" aria-hidden="true">
              <li>
                <span>Skills</span>
                <i style={{ "--w": "86%" }} />
              </li>
              <li>
                <span>Keywords</span>
                <i style={{ "--w": "72%" }} />
              </li>
              <li>
                <span>Format</span>
                <i style={{ "--w": "94%" }} />
              </li>
            </ul>
          </article>

          <article className="fcard fcard--2">
            <span className="ficon">
              <KeyRound size={18} />
            </span>
            <h3>Smart keyword generator</h3>
            <p>
              Finds the high-value keywords your resume is missing and suggests
              exactly where to add them.
            </p>
          </article>

          <article className="fcard fcard--4">
            <span className="ficon">
              <FileCheck2 size={18} />
            </span>
            <h3>Content evaluation</h3>
            <p>
              Simple, immediate fixes that make every bullet point clearer and
              more impactful.
            </p>
            <div className="ba" aria-hidden="true">
              <div>
                <small>Before</small>
                <p>Worked on website features.</p>
              </div>
              <div className="ba__after">
                <small>After</small>
                <p>
                  Built and shipped React features used by the whole sales team.
                </p>
              </div>
            </div>
          </article>

          <article className="fcard fcard--3">
            <span className="ficon">
              <History size={18} />
            </span>
            <h3>Report history</h3>
            <p>
              Generate multiple targeted resumes and interview plans, then save
              and manage them in a clean grid.
            </p>
          </article>

          <article className="fcard fcard--3">
            <span className="ficon">
              <ShieldCheck size={18} />
            </span>
            <h3>Private by default</h3>
            <p>
              Fully protected routes keep your career data and generated
              strategies visible only to you.
            </p>
          </article>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="vm" id="about">
        <header className="sec-head">
          <span className="tag">Our vision &amp; mission</span>
          <h2>Great candidates should never slip through the cracks.</h2>
        </header>

        <div className="vm__grid">
          {vm.map(({ icon: Icon, label, title, text, points }) => (
            <article key={label} className="vmcard">
              <span className="ficon ficon--lg">
                <Icon size={22} />
              </span>
              <small className="vmcard__label">{label}</small>
              <h3>{title}</h3>
              <p>{text}</p>
              <ul>
                {points.map((p) => (
                  <li key={p}>
                    <Check size={14} /> {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="vm__cta">
          <Link to="/signup" className="btn btn--glow">
            Enhance my resume <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <Leaders />

      <footer className="foot">
        <span className="foot__brand">
          <LogoMark size={26} /> GenAI Resume Enhancer
        </span>
        <small>© {new Date().getFullYear()}</small>
      </footer>
    </div>
  );
}
