import mongoose,{Schema} from "mongoose";

const todosSchema = Schema({
    heading:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    complete:{
        type: Boolean,
        default: false
    }
},{timestamps:true})

const todos = mongoose.model('todos',todosSchema)

export default todos