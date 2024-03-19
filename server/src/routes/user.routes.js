import {Router} from 'express'
import {
    LoginUser,
    checkUser,
    logout,
    registerUser
} from '../controllers/user.controllers.js'
import { verifyJWT } from '../middleware/auth.middleware.js'

const router = Router()

router.route('/login').post(LoginUser)
router.route('/signup').post(registerUser)
router.route('/logout').post(verifyJWT,logout)
router.route('/check').post(checkUser)
export default router