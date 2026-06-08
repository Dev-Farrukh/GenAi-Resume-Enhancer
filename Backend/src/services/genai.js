import { GoogleGenAI } from "@google/genai";
import config from "../config/config.js";
import puppeteer from "puppeteer"

const genai = new GoogleGenAI({ apiKey: config.GENAI_API_KEY });
const models =
    [
        "gemini-3.1-pro-preview",
        "gemini-2.5-pro",
        "gemini-2.5-flash",
        "gemini-2.5-flash-lite",
    ]

const geminiResponseSchema = {
    type: "OBJECT",
    properties: {
        matchScore: {
            type: "NUMBER",
            description:
                "A score between 0 and 100 indicating how well the candidate matches the job",
        },
        title: {
            type: "STRING",
            description: "The title of the job for which the report is generated",
        },
        technicalQuestions: {
            type: "ARRAY",
            description: "Technical questions with intention and answer guidance",
            items: {
                type: "OBJECT",
                properties: {
                    question: {
                        type: "STRING",
                        description: "The technical question to ask",
                    },
                    intention: {
                        type: "STRING",
                        description: "Why the interviewer asks this question",
                    },
                    answer: {
                        type: "STRING",
                        description: "How to answer — points to cover, approach, etc.",
                    },
                },
                required: ["question", "intention", "answer"],
            },
        },
        behavioralQuestions: {
            type: "ARRAY",
            description: "Behavioral questions with intention and answer guidance",
            items: {
                type: "OBJECT",
                properties: {
                    question: { type: "STRING" },
                    intention: { type: "STRING" },
                    answer: { type: "STRING" },
                },
                required: ["question", "intention", "answer"],
            },
        },
        skillGaps: {
            type: "ARRAY",
            description: "Skills the candidate is lacking and their severity",
            items: {
                type: "OBJECT",
                properties: {
                    skill: { type: "STRING" },
                    severity: {
                        type: "STRING",
                        enum: ["low", "medium", "high"],
                        description: "How critical this gap is for the role",
                    },
                },
                required: ["skill", "severity"],
            },
        },
        preparationPlan: {
            type: "ARRAY",
            description: "Day-by-day preparation plan",
            items: {
                type: "OBJECT",
                properties: {
                    day: { type: "INTEGER" },
                    focus: { type: "STRING" },
                    tasks: {
                        type: "ARRAY",
                        items: { type: "STRING" },
                    },
                },
                required: ["day", "focus", "tasks"],
            },
        },
    },
    required: [
        "matchScore",
        "title",
        "technicalQuestions",
        "behavioralQuestions",
        "skillGaps",
        "preparationPlan",
    ],
};

const invokeGenAI = async (Resume, jobDescription) => {
    const prompt = `
    You are an expert technical recruiter, senior software engineer,
    and interview coach with 15+ years of experience at top tech companies.
    You specialize in analyzing resumes against job descriptions, identifying gaps,
    and preparing candidates for both behavioral and technical interviews.
    Analyze the provided resume and job description thoroughly. Your job is to
    evaluate how well the candidate matches the job description, assign an overall 
    score (0–100), generate behavioral interview questions with their intention and 
    detailed answer guidance, generate technical interview questions with their 
    intention and step-by-step answer guidance, identify skill gaps with severity levels, 
    create a structured preparation plan to improve the candidate. Think like a 
    Google/Meta interviewer. Instead of asking basic questions, focus on
    real-world problem solving, trade-offs, decision-making, and depth of understanding.
    For example, instead of asking “What is React?”, ask scenario-based questions like how 
    the candidate optimized a React application and what trade-offs were involved. Expect reasoning, 
    clarity, and practical experience in answers.Do not include any explanation, markdown,
    or extra text outside the JSON. Ensure all questions are specific to the given job 
    description and all practice tasks are actionable and practical.
    Generate the repoort ising following details
    Resume : ${Resume}, Job Description: ${jobDescription}`;

    const response = await genai.models.generateContent({
        model: "gemini-2.5-flash",
        // model: "gemini-2.5-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: geminiResponseSchema
        }
    });


    console.log("Response from Gemini:", response.text);
    return JSON.parse(response.text);
};

const createPdf = async (report) => {
    const reportSchema = {
        type: "OBJECT",
       properties : {
         html: {
            type: "STRING",
            description: "Plain HTML code of the resume which can be converted to PDF"

        }
       },
       required : ["html"]
    }
    const prompt = `
        Write the HTML code for a concise ATS-friendly resume using only the most relevant information from the report.
        Output a single-page resume with short bullet points, minimal text, and no extra narrative.
        Use clear headings for Summary, Experience, Skills, and Education.
        Each bullet should be no more than 15 words, and the full resume should fit on one page.
        Do not include any explanation or markdown outside the HTML.
        Report: ${report}`

    const response = await genai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: reportSchema
        }
    })

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(JSON.parse(response.text).html, { waitUntil: 'networkidle2' })
        const pdf = await page.pdf({
            format: "A4",
            margin: {
                top: "1k0mm",
                bottom: "20mm",
                left: "15mm",
                right: "15mm"
            }
        })
        await browser.close()
        return pdf ;

    } catch (error) {
            throw new Error("Server Error" , error)
    }


}


export {invokeGenAI , createPdf};