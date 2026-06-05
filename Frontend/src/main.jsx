import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './features/Authentication/auth.context.jsx'
import { ReportProvider } from './features/Interview_Report/report.context.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter >
        <StrictMode>
            <AuthProvider>
                <ReportProvider>
                    <App />
                </ReportProvider>
            </AuthProvider>
        </StrictMode>
    </BrowserRouter >
)
