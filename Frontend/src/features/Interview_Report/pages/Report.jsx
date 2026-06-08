import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useReport } from '../hooks/report.hook';
import Loader from '../../Authentication/components/Loader';
import '../report.scss';

const Report = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const { fetchReportById, loading , createNewResume } = useReport();
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await fetchReportById(id);
        if (data && data.report) {
          setReportData(data.report);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching report:", err);
        setError(true);
      }
    };

    fetchReport();
  }, [id]);

const handleClickResume = async () => {
  // 1. Open the window IMMEDIATELY so the browser knows the user intended to do it
  const newWindow = window.open('', '_blank');
  
  // Optional: Give the user a loading state inside the new tab
  if (newWindow) {
    newWindow.document.title = "Loading Resume...";
    newWindow.document.body.innerHTML = "<p>Generating your resume, please wait...</p>";
  }

  try {
    // 2. Wait for your API call to finish
    const url = await createNewResume(id);
    
    // 3. Update the URL of the already opened window
    if (newWindow && !newWindow.closed) {
      newWindow.location.href = url;
    }
  } catch (err) {
    console.error('Error creating or opening resume:', err);
    // 4. Close the blank window if the API failed
    if (newWindow && !newWindow.closed) {
      newWindow.close();
    }
    // Optional: Alert the user in the main window that something went wrong
  }
};

  const renderBehavioralQuestions = () => (
    <div className="content-section">
      <h2 className="section-title">Behavioral Questions</h2>
      <div className="questions-container">
        {reportData?.behavioralQuestions?.map((q, idx) => (
          <div key={idx} className="question-card">
            <div className="question-header">
              <h3 className="question-number">Q{idx + 1}</h3>
              <p className="question-text">{q.question}</p>
            </div>
            <div className="question-details">
              <div className="detail-item">
                <label>Intention:</label>
                <p>{q.intention}</p>
              </div>
              <div className="detail-item">
                <label>Suggested Answer:</label>
                <p>{q.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTechnicalQuestions = () => (
    <div className="content-section">
      <h2 className="section-title">Technical Questions</h2>
      <div className="questions-container">
        {reportData?.technicalQuestions?.map((q, idx) => (
          <div key={idx} className="question-card technical">
            <div className="question-header">
              <h3 className="question-number">Q{idx + 1}</h3>
              <p className="question-text">{q.question}</p>
            </div>
            <div className="question-details">
              <div className="detail-item">
                <label>Intention:</label>
                <p>{q.intention}</p>
              </div>
              <div className="detail-item">
                <label>Suggested Answer:</label>
                <p>{q.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPreparationPlan = () => (
    <div className="content-section">
      <h2 className="section-title">Customized Preparation Plan For You</h2>
      <div className="plan-container">
        {reportData?.preparationPlan?.map((day, idx) => (
          <div key={idx} className="day-card">
            <div className="day-header">
              <h3 className="day-number">Day {day.day}</h3>
              <p className="day-focus">{day.focus}</p>
            </div>
            <div className="tasks-list">
              {day.tasks.map((task, taskIdx) => (
                <div key={taskIdx} className="task-item">
                  <span className="task-bullet">•</span>
                  <p>{task}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="content-section">
      <div className="overview-header">
        <div className="job-match">
          <h2>{reportData?.title}</h2>
          <div className="match-score">
            <span className="score-label">Match Score</span>
            <span className="score-value">{reportData?.matchScore}%</span>
          </div>
        </div>
      </div>

      <div className="overview-content">
        <div className="resume-section">
          <h3>Your Resume</h3>
          <div className="resume-text">
            {reportData?.resumeText?.split('\n').map((line, idx) => (
              line.trim() && <p key={idx}>{line}</p>
            ))}
          </div>
        </div>

        <div className="job-section">
          <h3>Job Description</h3>
          <div className="job-text">
            {reportData?.jobDescriptionText?.split('\n').map((line, idx) => (
              line.trim() && <p key={idx}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'behavioral':
        return renderBehavioralQuestions();
      case 'technical':
        return renderTechnicalQuestions();
      case 'preparation':
        return renderPreparationPlan();
      default:
        return renderOverview();
    }
  };
  if 
  (loading) {
  return <Loader data={["Ai is working ", "Redirecting ..."]}  />
  }

  return (
    <div className="report-page">
      {loading && <Loader />}

      {/* Structural Fix: Separate the container layouts for errors vs operational reports */}
      {error || !reportData ? (
        <div className="report-error-wrapper">
          <div className="report-not-found">
            <div className="error-icon">⚠️</div>
            <h2>Report Not Found</h2>
            <p>We couldn't locate or load the requested data insights. It might have been deleted, or something went wrong on our end.</p>
            <button className="generate-btn" onClick={() => navigate('/')}>
              Return to Dashboard
            </button>
          </div>
        </div>
      ) : (
        <div className="report-container">
          <aside className="report-sidebar left-sidebar">
            <div className="side-menu">
              <div className='sidebar-content'>
                <button
                  className={`sidebar-btn ${activeSection === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveSection('overview')}
                >
                  Overview
                </button>
                <button
                  className={`sidebar-btn ${activeSection === 'behavioral' ? 'active' : ''}`}
                  onClick={() => setActiveSection('behavioral')}
                >
                  Behavioral Questions
                </button>
                <button
                  className={`sidebar-btn ${activeSection === 'technical' ? 'active' : ''}`}
                  onClick={() => setActiveSection('technical')}
                >
                  Technical Questions
                </button>
                <button
                  className={`sidebar-btn ${activeSection === 'preparation' ? 'active' : ''}`}
                  onClick={() => setActiveSection('preparation')}
                >
                  Preparation Plan
                </button>
              </div>

              {/* Added 'sidebar-footer' class here */}
              <div className="sidebar-footer">
                <button className='generate-button' onClick={handleClickResume}> Create new resume
                </button>
              </div>
            </div>
          </aside>

          <main className="report-main-content">
            {renderContent()}
          </main>

          <aside className="report-sidebar right-sidebar">
            <div className="sidebar-content">
              <h3 className="sidebar-title">Skill Gaps</h3>
              <div className="skills-list">
                {reportData?.skillGaps?.map((gap, idx) => (
                  <div key={idx} className={`skill-card severity-${gap.severity?.toLowerCase() || 'medium'}`}>
                    <div>
                      <h4 className="skill-name">{gap.skill || gap}</h4>
                    </div>
                    <span className="severity-badge">{gap.severity || 'Required'}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Report;