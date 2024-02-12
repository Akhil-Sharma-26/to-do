import mongoose,{Schema} from "mongoose";
import { type } from "os";

const todosBasketSchema = Schema({
    title:{
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    todos:[
        {
            type: Schema.Types.ObjectId,
            ref: "todos"
        }
    ]
},{timestamps:true})

const TodoBasket = mongoose.model('TodoBasket',todosBasketSchema)

export default TodoBasket