import { error, log } from "console";
import User from "../models/user.model.js";
import { options } from "../constants/constant.mjs";


const generateAccessToken = async (user) => {
    try {
        // const user = await User.findById(userId);
        const accessToken = user.generateAccessToken(); // method as defind in modal of user
        user.accessToken = accessToken;
        await user.save({ validateBeforeSave: false }); 
        return accessToken;
    } catch (error) {
        throw new Error(500, "Token creation failed");
    }
}
async function registerUser(req,res){
    // console.log(req.body)
    const {username,password,email} = req.body
    if(!username && !password && !email){
        throw new Error('Some fields are not present');
    }
    // console.log(username,password,email);
    // try {
        const existedUser = await User.findOne({
            $or: [
                { username },
                { email }
            ]
        })
        // console.log(existedUser); // null if not exist
        if(existedUser){
            throw new Error('user already exists!!')
        }
        const user = await User.create({
            username: username,
            email: email,
            password: password
        })
        // console.log(user);
        const CreatedUser = await User.findById(user._id).select("-password -accessToken"); //
        // This above method can be removed as it may be a burden db call
        if (!CreatedUser) { 
            throw new Error(500, "User creation failed");
        }
        // console.log(CreatedUser);
        return res.status(200).json({
            data: 'User created Successfully',
        })
    // } catch (error) {
    //     console.log('user registration failed miserably');   
    // }
}

async function LoginUser(req,res){
    try {
        const {email,password} = req.body;
        if(!email && !password){
            console.log('Something is missing');
        }
        const user = await User.findOne({
            $or : [
                {email},
                {password}
            ]
        })
        if(!user){
            throw new Error(404,'User doenst exist in DB')
        }
        const passValidorNot = await user.isPasswordCorrect(password)
        if (!passValidorNot) {
            throw new Error(401, "Password is incorrect");
        }
        const accessToken= await generateAccessToken(user); // I am tweeking the argument here, change it to prev state if some unexpected error appears 
        console.log(accessToken);
        return res.status(200).cookie("accessToken",accessToken,options).json({
            data: 'Yoooo!!! User loggedIn successfull'
        })
    } catch (error) {
        console.log('A very serious error has poped out!!',error);
    }
}
async function logout(req,res){
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .json({
        data: "Logout Successfull!!"
    })
}
export {
    LoginUser,
    registerUser,
    logout
}