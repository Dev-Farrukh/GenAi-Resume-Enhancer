import axios from 'axios'

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
})

const isValidMongoId = (id) => typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(id)

export const generateAiReport = async ( data ) => {
    try {
        const response = await axiosClient.post('/routes/report/generate', data)
        return response.data
    } catch (error) {
        console.error("Error generating report:", error)
        throw error
        
    }
}

export const getReportbyId = async (reportId) => {
    try {
        const response = await axiosClient.get(`/routes/report/${reportId}`)
        return response.data
    } catch (error) {
        console.error("Error fetching report:", error)
        throw error
    }
}

export const getAllReports = async () => {
    try {
        const response = await axiosClient.get('/routes/reports')
        return response.data.reports
    } catch (error) {
        console.error("Error fetching reports:", error)
        throw error
    }
}

export const deleteReport = async (reportId) => {
    try {
        const response = await axiosClient.delete(`/routes/delete/${reportId}`)} 
    catch (error) {
        console.error("Error deleting report:", error)
        throw error
    }
}

export const createResume = async (reportId) => {
    console.log("[Report Service] createResume called with reportId:", reportId);
    console.log("[Report Service] Is valid Mongo ID:", isValidMongoId(reportId));
    
    if (!isValidMongoId(reportId)) {
        throw new Error(`Invalid report ID format: ${reportId}`)
    }

    try {
        const apiUrl = `/routes/createResume/${reportId}`;
        console.log("[Report Service] Sending POST request to:", apiUrl);
        const response = await axiosClient.post(apiUrl, null, { responseType: 'blob' })
        console.log("[Report Service] Response received, blob size:", response.data.size);
        return response.data
    } catch (error) {
        console.log("[Report Service] Error in createResume:", error)
        throw error
    }
