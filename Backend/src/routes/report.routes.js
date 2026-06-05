import express from "express"
import tokenVerify from "../middlewares/tokenVerfication.js"
import uploadSingle from "../middlewares/pdfStore.js"
import * as reportController from "../controller/report.controller.js"

const reportRoutes = express.Router()
/**
 * @route POST api/routes/report
 * @description Genrate report for the user
 * @access Private
 */
reportRoutes.post('/report/generate', tokenVerify, uploadSingle("resume") , reportController.generateReport)

/**
 * @route GET api/routes/report/:reportId
 * @description Get a specific report by ID
 * @access Private
 */
reportRoutes.get('/report/:reportId', tokenVerify, reportController.getReportById)

/**
 * @route GET api/routes/report
 * @description Get all reports for the user
 * @access Private
 */
reportRoutes.get('/reports', tokenVerify, reportController.getAllReports)

/**
 * @route POST api/routes/createResume/:id
 * @description Create a resume based on a report
 * @access Private
 */
reportRoutes.post('/createResume/:id', tokenVerify, reportController.createResume)

/**
 * @route DELETE api/routes/delete/:id
 * @description Delete a specific report by ID
 * @access Private
 */
reportRoutes.delete('/delete/:reportId', tokenVerify, reportController.deleteReportById)

export default reportRoutes