import mongoose,{Schema} from "mongoose";

const todosBasketSchema = Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    todos:[
        {
            type: Schema.Types.ObjectId,
            ref: "todos",
            unique: true
        }
    ]
},{timestamps:true})

const TodoBasket = mongoose.model('TodoBasket',todosBasketSchema)

export default TodoBasket