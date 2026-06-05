import express from 'express'
import * as userController from "../controller/user.controller.js "
import tokenVerify from '../middlewares/tokenVerfication.js'

const userRoutes = express.Router()


/**
 * @route POST
 * @name Register Api
 * @description User to add register in db
 */
userRoutes.post('/register' , userController.register)

/**
 * @route POST api/auth/login
 * @description User login to get access token
 * @access Public
 */
userRoutes.post('/login', userController.login)

/**
 * @route POST api/auth/logout
 * @description User logout to invalidate access 
 * @access Public
 */
userRoutes.get('/logout', userController.logout)

/**
 * @route GET api/auth/me
 * @description Get current logged-in user's profile
 * @access Private
 */
userRoutes.get('/me', tokenVerify, userController.get_me)


export default userRoutes