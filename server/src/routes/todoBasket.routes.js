import {
    CreatingBasket
} from '../controllers/bigTodo.controllers.js'
import { Router } from 'express'

const router = Router()

router.route('/create').post(CreatingBasket)    

export default router
