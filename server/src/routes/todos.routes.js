import { createTodo, deleteTodo, editTodo, getTodos, updateTodoStatus } from "../controllers/Todo.controllers.js";
import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.route('/createTodo/:bracketID').post(verifyJWT,createTodo)
router.route('/get/:bid').get(verifyJWT,getTodos)
router.route('/update/:tid').get(verifyJWT,updateTodoStatus)
router.route('/edit/:tid').post(verifyJWT,editTodo)
router.route('/del/:tid').get(verifyJWT,deleteTodo)

export default router