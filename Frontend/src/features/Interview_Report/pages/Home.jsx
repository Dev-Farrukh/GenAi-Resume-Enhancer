import React, { useEffect, useRef, useState } from 'react'
import '../report.scss'
import Loader from '../../Authentication/components/Loader'
import { useReport } from '../hooks/report.hook'
import { useNavigate } from 'react-router'
import { LiaFileUploadSolid } from "react-icons/lia";
import { SiGooglegemini } from "react-icons/si"

import { motion } from 'framer-motion'

const Home = () => {
    const [resume, setResume] = useState(null)
    const [jobDescription, setJobDescription] = useState("")
    const { allReports, generateReport, fetchAllReports, deleteReportById, loading, setAllReports } = useReport()
    const [isGenerating, setIsGenerating] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    
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
        setIsDragging(false)
        const file = e.dataTransfer.files[0]
        if (file) {
            setResume(file.name)
            // if we need to assign it to input, DataTransfer can be used
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            ref.current.files = dataTransfer.files;
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleGenerateReport = async (e) => {
        e.preventDefault()
        setIsGenerating(true)
        const file = ref.current.files[0]
        const reportData = await generateReport({ jobDescription, resume: file })
        navigate(`/report/${reportData.report._id ? reportData?.report?._id : null}`)
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
            <div className='home-page-bg-glow' />
            <div className='home-container'>
                <motion.div 
                    className='home-header'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1>Create Your Custom <span className='highlight'>Interview Plan</span></h1>
                    <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
                </motion.div>

                <form onSubmit={handleGenerateReport}>
                    <div className='home-content'>
                        <motion.div 
                            className='left-section'
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
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
                        </motion.div>

                        <motion.div 
                            className='right-section'
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className='section-title'>
                                Your Profile
                            </div>

                            <div className='upload-section'>
                                <label
                                    htmlFor='resume-upload'
                                    className={`upload-area ${isDragging ? 'drag-active' : ''} ${resume ? 'has-file' : ''}`}
                                    onDrop={handleDragDrop}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
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
                        </motion.div>
                    </div>

                    <motion.div 
                        className='action-section'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className='footer-info'>AI Powered Strategy Generation - Gemini 2.5+</div>
                        <button className='generate-btn' type="submit" disabled={!jobDescription || !resume}>
                            <span className='btn-icon'><SiGooglegemini size={24}/></span>
                            Generate My Strategy
                        </button>
                        </motion.div>
                </form>

                {allReports?.length > 0 &&
                    <motion.div 
                        className='history-section'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className='history-header'>
                            <div className='section-title history-title'>Recent History</div>
                            <span className='history-count'>{allReports.length}</span>
                        </div>
                        <div className='history-grid'>
                            {allReports.map((item, i) => (
                                <motion.div 
                                    key={item._id} 
                                    className='history-card' 
                                    onClick={() => navigate(`/report/${item._id}`)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 * i }}
                                >
                                    <div className='history-card-header'>
                                        <h3>{item.title}</h3>
                                        <button 
                                            className='delete-btn' 
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                openDeleteModal(item._id) 
                                            }}
                                            title="Delete report"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <p className='history-card-summary'>{item.title}</p>
                                    <span className='history-card-date'>
                                        {new Date(item.createdAt).toLocaleString(undefined, {
                                            year: 'numeric', month: 'short', day: 'numeric',
                                            hour: '2-digit', minute: '2-digit'
                                        })}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>}
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