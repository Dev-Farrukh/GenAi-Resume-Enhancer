import { createContext, useState} from "react";

export const ReportContext = createContext()

export const ReportProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [report, setReport] = useState(null)
    const [allReports, setAllReports] = useState([])
    
    return (
        <ReportContext.Provider value={{ loading, setLoading, report, setReport, allReports, setAllReports }}>
            {children}
        </ReportContext.Provider>
    )

}