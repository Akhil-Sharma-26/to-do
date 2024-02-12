import { error, log } from "console";
import User from "../models/user.model";


const generateAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken(); // method as defind in modal of user
        user.accessToken = accessToken;
        await user.save({ validateBeforeSave: false }); // validateBeforeSave is false because we are not updating all field
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Token creation failed");
    }
}
async function registerUser(req,res){
    const {username,password,email} = req.body
    if(username && password && email){
        throw new error('Some fields are not present');
    }
    try {
        const existedUser = await User.findOne({
            $or: [
                { username },
                { email }
            ]
        })
    
        const user = await User.create({
            username: username,
            email: email,
            password: password
        })
        const CreatedUser = await User.findById(user._id).select("-password -accessToken");
        if (!CreatedUser) { 
            throw new ApiError(500, "User creation failed");
        }
        return res.status(200).json({
            data: 'User created Successfully',
        })
    } catch (error) {
        console.log('user registration failed miserably');   
    }
}

async function LoginUser(req,res){
    const {email,password} = req.body;
    if(email && password){
        console.log('Something is missing');
    }
    const user = User.findOne({
        $or : [
            {email},
            {password}
        ]
    })
    if(!user){
        throw new error(404,'User doenst exist in DB')
    }
    const passValidorNot = User.passValidorNot(password)
    if (!isPassValid) {
        throw new error(401, "Password is incorrect");
    }
    const { accessToken} = await generateAccessToken(user._id); // I am tweeking the argument here, change it to prev state if some unexpected error appears 
}