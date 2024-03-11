import mongoose,{Schema} from "mongoose";

const todosSchema = Schema({
    content:{
        type: String,
        required: true,
    },
    complete:{
        type: Boolean,
        default: false
    },
    createdbyBasket:{
        type: Schema.Types.ObjectId,
        ref: "TodoBasket",
        required: true
    }
},{timestamps:true})

const todos = mongoose.model('todos',todosSchema)

export default todos