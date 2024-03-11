import { createTodo, getTodos } from "../controllers/Todo.controllers.js";
import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.route('/createTodo/:bracketID').post(verifyJWT,createTodo)
router.route('/get/:bid').get(verifyJWT,getTodos)

export default router