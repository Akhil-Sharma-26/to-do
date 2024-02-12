import {Router} from 'express'
import {
    LoginUser,
    registerUser
} from '../controllers/user.controllers.js'

const router = Router()

router.route('/login').post(LoginUser)
router.route('/signup').post(registerUser)


export default router