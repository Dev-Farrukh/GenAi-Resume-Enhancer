import blacklistModel from "../model/tokenBlacklist.schema.js"
import jwt from "jsonwebtoken"
import config from "../config/config.js"

const tokenVerify = async (req, res, next) => {
    const token = req.cookies.token
    console.log("tokenVerify cookie check:", req.cookies)
    if (!token) {
        return res.status(401).json({ message: "Token not Provided" })
    }

    const isBlacklisted = await blacklistModel.findOne({ token })
    if (isBlacklisted) {
        return res.status(401).json({ message: "Token is not valid , Try login again" })
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET)
        req.user = decoded
        next()

    } catch (error) {
        console.log("Token verfication failed ", error);
        return res.status(401).json({ message: "Token is invalid or expired" })
    }
}
export default tokenVerify