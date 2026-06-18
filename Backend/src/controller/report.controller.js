import { PDFParse } from "pdf-parse"
import { invokeGenAI, createPdf } from "../services/genai.js";
import reportModel from "../model/report.schema.js";
import mongoose from "mongoose";

export const generateReport = async (req, res) => {
    const { jobDescription } = req.body
    const resumeFile = req.file?.buffer
    if (!jobDescription || !resumeFile) {
        return res.status(400).json({
            message: "Job description and resume file are required ",
            jobDescription: jobDescription || undefined,
            resumeFile: resumeFile || undefined
        })
    }

    const parser = new PDFParse(Uint8Array.from(resumeFile))
    const resumeText = (await parser.getText()).text

    const aiReport = await invokeGenAI(resumeText, jobDescription)

    const report = await reportModel.create({
        user: req.user.id,
        resumeText,
        jobDescriptionText: jobDescription,
        ...aiReport,
    })
    res.status(201).json({ message: "Report created successfully", report })
}

export const getReportById = async (req, res) => {
    const { reportId } = req.params
    if (!reportId) {
        return res.status(400).json({ message: "Report ID is required" })
    }
    const report = await reportModel.findById(reportId)
    if (!report) {
        return res.status(404).json({ message: "Report not found" })
    }
    res.status(200).json({ report })
}

export const deleteReportById = async (req, res) => {
    const reportId = req.params.reportId
    if (!reportId) {
        return res.status(404).json({ message: "Report id is required" })
    }

    const report = await reportModel.findByIdAndDelete(reportId)
    if (!report) {
        return res.status(404).json({ message: "Report not found" })
    }
    res.status(200).json({ message: "Report deleted successfully" })
}

export const getAllReports = async (req, res) => {
    const reports = await reportModel.find({ user: req.user.id })
    console.log(req.user.id, "reports");

    // .sort({ createdAt: -1 }).selected("-resumeText -jobDescriptionText -behavioralQuestions -technicalQuestions -skillGaps -preparationPlan")
    res.status(200).json({ message: "Reports fetched successfully", reports })
}

export const createResume = async (req, res) => {
    try {
        const { _id } = req.params
        
        if (!_id) {
            return res.status(400).json({ message: "Id not found" })
        }
        const report = await reportModel.findOne({"_id":_id})
        console.log("report" , report);
        if (!report) {
            return res.status(400).json({ message: "Report not found" })
        }
        const resume = await createPdf(report)

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename = resume${_id}.pdf`
        })

        res.send(resume)
    } catch (error) {
        console.log("Error in creating from report-controller.js - line 82", error);
        return res.status(500).json({
            message: "Error in creating from report-controller.js - line 82",
            error: error.message
        })


    }

}
