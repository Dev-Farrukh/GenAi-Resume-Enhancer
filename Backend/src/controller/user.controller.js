import jwt from "jsonwebtoken"
import userModel from "../model/user.schema.js"
import config from "../config/config.js"
import bcrypt from "bcryptjs"
import blacklistModel from "../model/tokenBlacklist.schema.js"

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/"
}

/**
 * @route POST
 * @name Register Api
 * @description User to add register in db
 */
export const register = async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Required fields are missing" })
    }

    const isUserExist = await userModel.findOne({ $or: [{ email }, { username }] })
    if (isUserExist) {
        if (isUserExist.username === username) {
            return res.status(400).json({ message: "Account already exist with this username" })
        }
        return res.status(400).json({ message: "Account already exist with this email" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    })
    
    const token = jwt.sign({ id: user._id, username: user.username }, config.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token, cookieOptions)
    res.status(201).json({ message: "User registered successfully", user: { id: user._id, username: user.username } })
}

/**
 * @route POST api/auth/login
 * @description User login to get access token
 * @access Public
 */
export const login = async (req, res) => {
    
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Required fields are missing" })
    }

    const userExist = await userModel.findOne({ email })
    if (!userExist) {
        return res.status(400).json({ message: "Invalid credentials" })
    }

    const isPassswordValid = await bcrypt.compare(password, userExist.password)
    if (!isPassswordValid) {
        return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign({ id: userExist._id, username: userExist.username }, config.JWT_SECRET, { expiresIn: "1d" })
    res.cookie("token", token, cookieOptions)

    res.status(200).json({ message: "Login successful", user: { id: userExist._id, username: userExist.username } })
}

export const logout = async (req, res) => {
    const token = req.cookies.token
    if (token) {
        await blacklistModel.create({ token })
    }

    res.clearCookie("token", cookieOptions)
    res.status(200).json({ message: "Logout successful" })
}

export const get_me = async (req, res) => {
    const user = req.user
    const foundUser = await userModel.findById(user.id).select("-password")
    if(!foundUser) {
        return res.status(404).json({ message: "User not found" })
    }
    res.status(200).json({ user: foundUser })
}
