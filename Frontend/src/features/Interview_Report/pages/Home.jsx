import React, { useEffect, useRef, useState } from 'react'
import '../report.scss'
import Loader from '../../Authentication/components/Loader'
import { useReport } from '../hooks/report.hook'
import { useNavigate } from 'react-router'
import { LiaFileUploadSolid } from "react-icons/lia";
import { SiGooglegemini } from "react-icons/si"

const isValidMongoId = (id) => typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(id)

const Home = () => {
    const [resume, setResume] = useState(null)
    const [jobDescription, setJobDescription] = useState("")
    const { allReports, generateReport, fetchAllReports, deleteReportById, loading, setAllReports } = useReport() // Added deleteReportById here if missing
    const [isGenerating, setIsGenerating] = useState(false)
    
    // Modal confirmation states
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [reportToDelete, setReportToDelete] = useState(null)

    const navigate = useNavigate()
    const ref = useRef(null)

    // Triggers when user clicks the delete button in the grid
    const openDeleteModal = (reportId) => {
        setReportToDelete(reportId)
        setIsModalOpen(true)
    }

    // Handles the actual API call after confirmation
    const handleConfirmDelete = async () => {
        if (reportToDelete) {
            await deleteReportById(reportToDelete)
            setIsModalOpen(false)
            setReportToDelete(null)
        }
    }

    // Handles modal cancellation
    const handleCancelDelete = () => {
        setIsModalOpen(false)
        setReportToDelete(null)
    }

    const handleResumeUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            setResume(file.name)
        }
    }

    const handleDragDrop = (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if (file) {
            setResume(file.name)
        }
    }

    const handleGenerateReport = async (e) => {
        e.preventDefault()
        setIsGenerating(true)
        const file = ref.current.files[0]
        console.log("[Home Page] Generating report...");
        const reportData = await generateReport({ jobDescription, resume: file })
        const reportId = reportData?.report?._id
        
        console.log("[Home Page] Report generated. Response data:", reportData);
        console.log("[Home Page] Extracted report._id:", reportId);
        console.log("[Home Page] Is valid Mongo ID:", isValidMongoId(reportId));

        if (!isValidMongoId(reportId)) {
            console.error("[Home Page] Invalid report ID returned from backend:", reportData)
            alert("Unable to navigate to report: invalid report ID.")
            setIsGenerating(false)
            return
        }

        console.log("[Home Page] Navigating to /report/" + reportId);
        navigate(`/report/${reportId}`)
        setIsGenerating(false)
    }

    useEffect(() => {
        fetchAllReports()
    }, [])
    
    if (loading) {
        if (isGenerating) {
            return <Loader data={["Ai is generating your report ", "Almost there ..."]} />
        }
        return <Loader />
    }

    return (
        <div className='home-page'>
            <div className='home-container'>
                <div className='home-header'>
                    <h1>Create Your Custom <span className='highlight'>Interview Plan</span></h1>
                    <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
                </div>

                <form onSubmit={handleGenerateReport}>
                    <div className='home-content'>
                        <div className='left-section'>
                            <div className='section-title'>
                                Target Job Description
                            </div>
                            <textarea
                                className='input-textarea'
                                placeholder="Paste the full job description here..."
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            />
                            <div className='char-count'>{jobDescription.length} / 5000 chars</div>
                        </div>

                        <div className='right-section'>
                            <div className='section-title'>
                                Your Profile
                            </div>

                            <div className='upload-section'>
                                <label
                                    htmlFor='resume-upload'
                                    className='upload-area'
                                    onDrop={handleDragDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                    style={{ cursor: 'pointer', display: 'block' }}
                                >
                                    <div className='upload-icon'><LiaFileUploadSolid size={70} /></div>
                                    <p>{resume ? `Selected: ${resume}` : 'Click to upload or drag & drop'}</p>
                                    <span className='file-info'>PDF (Max 5MB)</span>

                                    <input
                                        type='file'
                                        ref={ref}
                                        className='file-input'
                                        accept='.pdf'
                                        onChange={handleResumeUpload}
                                        style={{ display: 'none' }}
                                        id='resume-upload'
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='action-section'>
                        <div className='footer-info'>AI Powered Strategy Generation - Gemini 2.5+</div>
                        <button className='generate-btn' type="submit">
                            <span className='btn-icon'><SiGooglegemini size={24}/></span>
                            Generate My Interview Strategy
                        </button>
                    </div>
                </form>

                {allReports.length > 0 &&
                    <div className='history-section'>
                        <div className='history-header'>
                            <div className='section-title history-title'>Recent History</div>
                            <span className='history-count'>{allReports.length} reports</span>
                        </div>
                        <div className='history-grid'>
                            {allReports.map((item) => (
                                <div key={item._id} className='history-card' onClick={() => navigate(`/report/${item._id}`)}>
                                    <div className='history-card-header'>
                                        <h3>{item.title}</h3>
                                        <button 
                                            className='delete-btn' 
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                openDeleteModal(item._id) // Triggers the confirmation flow
                                            }}
                                            title="Delete report"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <p className='history-card-summary'>{item.title}</p>
                                    <span className='history-card-date'>{new Date(item.createdAt).toLocaleDateString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>}
            </div>

            {/* Modal Overlay Markup */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={handleCancelDelete}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Confirm Deletion</h2>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this report? This action cannot be undone.</p>
                        </div>
                        <div className="modal-actions">
                            <button className="modal-btn cancel-btn" onClick={handleCancelDelete}>
                                Cancel
                            </button>
                            <button className="modal-btn confirm-btn" onClick={handleConfirmDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home