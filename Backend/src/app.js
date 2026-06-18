import cors from "cors"
import express from "express"
import userRoutes from "./routes/user.routes.js"
import cookieParser from "cookie-parser"
import db_config from "./config/db_config.js"
import reportRoutes from "./routes/report.routes.js"
import config from "./config/config.js"

const app = express()
db_config()


app.use(express.json())
app.use(cookieParser())

const frontendOrigin = process.env.FRONTEND_URL ?? "https://genai-resume-enhancer.vercel.app"
const allowedOrigins = [frontendOrigin]
if (process.env.NODE_ENV !== "production") {
    allowedOrigins.push("http://localhost:5173")
}

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

app.use("/api/auth", userRoutes)
app.use("/api/routes", reportRoutes)
app.get("/" , (req, res) => {
    res.send("Welcome !!  Backend is working fine")
})
export default app