import {Router} from 'express'
import {
    LoginUser,
    logout,
    registerUser
} from '../controllers/user.controllers.js'

const router = Router()

router.route('/login').post(LoginUser)
router.route('/signup').post(registerUser)
router.route('/logout').post(logout)

export default router