import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        index : true,
    },
    email:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    Createdtodos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TodoBasket',
        required: false
    },
    accessToken:{
        type:String,
        required:false
    },
},{timestamps:true})

userSchema.pre("save",async function(next){ // Hashin password
    const user = this;
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,7);
    }
    next();
})

userSchema.methods.generateAccessToken = function(){ // Generating access token
    const user = this;
    const token = jwt.sign({
        id:user._id,
        email:user.email,
        username:user.username,
        fullName:user.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    });
    return token;
}

userSchema.methods.isPasswordCorrect = async function(password){ // Checking password
    const user = this;
    return await bcrypt.compare(password,user.password);
}



const User = mongoose.model('User',userSchema)

export default User