import axios from 'axios'

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
})

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
    try {
        const response = await axiosClient.post(`/routes/createResume/${reportId}`, null, { responseType: 'blob' })
        return response.data
    } catch (error) {
        console.log("Error in report-service - 43" , error);
        
    }
}