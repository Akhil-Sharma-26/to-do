import todos from "../models/todos.model.js";
import TodoBasket from "../models/todoBasket.model.js";
async function createTodo(req,res){
    const bracketID = req.params.bracketID
    const {content,complete} = req.body
    // console.log(req.params);
    // console.log(bracketID);
    if(!content){
        return res.status(400).json({
            error: "Content is missing"
        })
    }
    const newTodo = new todos({
        createdbyBasket:bracketID,
        content:content
    })
    if(!newTodo){
        res.status(501).json({
            error: "Failed to make newTodo"
        })
    }
    await newTodo.save()
    // console.log(basket);
    // basket.save()
    return res.status(200).json({
        data: "Successfuulllyy Created a new todo!!"
    })
}
async function getTodos(req,res){
    const bracketID = req.params.bid
    const todo = await todos.find({createdbyBasket:bracketID})
    if(!todo){
        res.status(501).json({
            error: "Failed to get todos"
        })
    }
    return res.status(200).json({
        data: todo
    })
}
async function updateTodoStatus(req,res){
    const todoID = req.params.tid
    const todo = await todos.findById(todoID)
    if(!todo){
        res.status(501).json({
            error: "Failed to update todos"
        })
    }
    todo.complete = !todo.complete
    await todo.save()
    return res.status(200).json({
        data: "Successfully updated the status of the todo"
    })
}
async function editTodo(req,res){
    const todoID = req.params.tid
    const {content} = req.body
        const todo = await todos.findById(todoID)
        if(!todo){
            res.status(501).json({
                error: "Failed to edit todos"
            })
        }
        todo.content = content
        await todo.save()
        return res.status(200).json({
            data: "Successfully updated the status of the todo"
        })
}
async function deleteTodo(req,res){
    const todoID = req.params.tid
    const todo = await todos.findById(todoID)
    if(!todo){
        res.status(501).json({
            error: "Failed to delete todos"
        })

    }
    await todos.findByIdAndDelete(todoID);
    return res.status(200).json({
        data: "Successfully deleted the todo"
    })

    
}
export {
    deleteTodo,
    editTodo,
    updateTodoStatus,
    createTodo,
    getTodos
}