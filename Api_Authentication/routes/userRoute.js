import express from "express"
import userController from "../controllers/userController.js"
import middleware from "../middlewares/authMiddleware.js"

const router = express.Router()

const { auth } = middleware
//public
router.post('/register', userController.userRegistration)
router.post('/login', userController.userLogin)

//protected
router.post('/changePassword', auth, userController.changePassword)


export default router