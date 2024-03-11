import mongoose,{Schema} from "mongoose";

const todosBasketSchema = Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
},{timestamps:true})

const TodoBasket = mongoose.model('TodoBasket',todosBasketSchema)

export default TodoBasket