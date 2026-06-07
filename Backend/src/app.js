import cors from "cors"
import express from "express"
import userRoutes from "./routes/user.routes.js"
import cookieParser from "cookie-parser"
import db_config from "./config/db_config.js"
import reportRoutes from "./routes/report.routes.js"
import config from "./config/config.js"

const temp = {
    sampleDescription: `
We are looking for a Full Stack Developer (MERN Stack) to join our engineering team. The ideal candidate should be able to build scalable web applications and work across both frontend and backend systems.
Responsibilities:
Develop and maintain full-stack web applications using MongoDB, Express.js, React.js, and Node.js
Build responsive and user-friendly frontend interfaces
Design and implement RESTful APIs
Work with authentication and authorization systems (JWT, OAuth basics)
Optimize applications for performance and scalability
Collaborate with UI/UX designers and product managers
Required Skills:
Strong knowledge of JavaScript (ES6+)
Experience with React.js and state management (Redux or Context API)
Experience with Node.js and Express.js
MongoDB and basic database design
REST API development
Git and version control
Preferred Skills:
TypeScript
Deployment (Vercel, Netlify, AWS basics)
Testing (Jest, Mocha)
Basic system design understanding`,
    sampleResume: `
    Name: Ali Raza
Role: Frontend Developer

Summary

Frontend developer with 2 years of experience building responsive web applications using React.js and JavaScript. Familiar with backend basics and REST APIs.

Skills
JavaScript (ES6)
React.js
HTML5, CSS3, Tailwind CSS
Basic Node.js
Git & GitHub
REST APIs
Experience

Frontend Developer – TechNova Solutions (2023 – Present)

Built reusable UI components in React.js
Integrated REST APIs for dynamic data rendering
Improved UI performance by optimizing re-renders
Worked with backend team for API integration

Junior Web Developer – CodeCraft (2022 – 2023)

Developed landing pages using HTML, CSS, JavaScript
Assisted in building small React applications
Fixed UI bugs and improved responsiveness
Projects

E-Commerce Web App

Built using React.js and Node.js
Implemented product listing and cart functionality
Used REST APIs for backend communication

Task Manager App

Built with React and Context API
Added login/logout functionality (basic JWT integration)
Responsive design for mobile and desktop
Education

BS Computer Science – 2022 `

}

const app = express()
db_config()


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "https://genai-resume-enhancer.vercel.app/",
    credentials: true
}))

app.use("/api/auth", userRoutes)
app.use("/api/routes", reportRoutes)
app.get("/" , (req, res) => {
    res.send("Welcome !!  Backend is working fine")
})
export default app