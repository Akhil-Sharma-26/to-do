import todos from "../models/todos.model.js";
import TodoBasket from "../models/todoBasket.model.js";
async function createTodo(req,res){
    const bracketID = req.params.bracketID
    const {heading,content,complete} = req.body
    console.log(req.params);
    console.log(bracketID);
    if(!heading && !content && !complete){
        throw new Error('Fields are missing!!!')
    }
    const newTodo = new todos({
        heading:heading,
        content:content
    })
    if(!newTodo){
        res.status(501).json({
            error: "Failed to make newTodo"
        })
    }
    await newTodo.save()
    const basket = await TodoBasket.findByIdAndUpdate(bracketID,{
        $push: {
            todos : newTodo
        }
    },{new:true})
    console.log(basket);
    basket.save()
    return res.status(200).json({
        data: "Successfuulllyy Created a new todo!!"
    })
}

export {
    createTodo
}