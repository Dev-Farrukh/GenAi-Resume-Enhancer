import { useContext } from "react";
import { ReportContext } from "../report.context.jsx";
import { createResume, deleteReport, generateAiReport, getAllReports, getReportbyId } from "../services/report.service.js";

const isValidMongoId = (id) => typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(id)

export const useReport = () => {
    const {loading, setLoading , report , setReport, allReports, setAllReports} = useContext(ReportContext);

    const generateReport = async (reportData) => {
        try {
            setLoading(true);
            const data = new FormData();
            data.append('jobDescription', reportData.jobDescription);
            data.append('resume', reportData.resume);
            const response = await generateAiReport(data);
            setReport(response);
            console.log("Report generated successfully", response);
            return response
            
        } catch (error) {
            console.log("Error generating report" , error );
            return error
            
        }finally {
            setLoading(false);
        }
    }

    const fetchReportById = async (reportId) => {
        try {
            setLoading(true);
            const response = await getReportbyId(reportId);
            setReport(response);
            return response
        } catch (error) {
            console.log("Error fetching report by id", error);
            return error
        }finally {
            setLoading(false);
        }

    }

    const fetchAllReports = async () => {
        try {
            setLoading(true);
            const response = await getAllReports();
            
            setAllReports(response);
            return response
        } catch (error) {
            console.log("Error fetching all reports", error);
            return error
        }finally {
            setLoading(false);
        }

    }

    const deleteReportById = async (reportId) => {
        try {
            setLoading(true);
            await deleteReport(reportId);
            setAllReports(prev => prev.filter(report => report._id !== reportId))
        }catch (error) {
            console.log("Error deleting report", error);
            return error
        }finally {
            setLoading(false);
        }
    }

    const createNewResume = async (reportId) => {
        if (!isValidMongoId(reportId)) {
            throw new Error(`Invalid report ID format: ${reportId}`)
        }

        try {
            setLoading(true)
            const response = await createResume(reportId)
            const blob = response instanceof Blob ? response : new Blob([response], { type: 'application/pdf' })
            const pdfUrl = URL.createObjectURL(blob)
            return pdfUrl
            
        } catch (error) {
            throw new Error("Error in createResume reporthook - 65")
            
        }finally{
            setLoading(false)
        }

    }

    return {
        generateReport,
        fetchReportById,
        fetchAllReports,
        deleteReportById,
        createNewResume,
        loading,
        report,
        allReports
    }
}