import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        index : true,
    },
    password: {
        type: String,
        required: true
    },
    todos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todos',
        required: false
    }
},{timestamps:true})

userSchema.pre("save",async function(next){ // Hashin password
    const user = this;
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,7);
    }
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){ // Checking password
    const user = this;
    return await bcrypt.compare(password,user.password);
}

const User = mongoose.model('User',userSchema)

export default User