import { error, log } from "console";
import User from "../models/user.model.js";
import { options } from "../constants/constant.mjs";

import jwt from "jsonwebtoken"

const generateAccessToken = async (user) => {
    try {
        // const user = await User.findById(userId);
        const accessToken = user.generateAccessToken(); // method as defind in modal of user
        user.accessToken = accessToken;
        await user.save({ validateBeforeSave: false }); 
        return accessToken;
    } catch (error) {
        return res.status(500).json({
            error: "Failed to generate access token"
        })
    }
}
async function registerUser(req,res){
    // console.log(req.body)
    const {username,password,email} = req.body
    if(!username && !password && !email){
        return res.status(400).json({
            error: "Some fields are missing"
        })
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
            return res.status(400).json({
                error: "User already exists"
            })
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
            return res.status(500).json({
                error: "Failed to create user"
            })
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
            return res.status(400).json({
                error: "Some fields are missing"
            })
        }
        const user = await User.findOne({
            $or : [
                {email},
                {password}
            ]
        })
        if(!user){
            return res.status(404).json({
                error: "User not found"
            })
        }
        const passValidorNot = await user.isPasswordCorrect(password)
        if (!passValidorNot) {
            return res.status(401).json({
                error: "Invalid Password"
            })
        }
        const accessToken= await generateAccessToken(user); // I am tweeking the argument here, change it to prev state if some unexpected error appears 
        // console.log(accessToken);
        return res.status(200).cookie("accessToken",accessToken,options).json({
            data: user,
            message: "Wow!!"
        })
    } catch (error) {
        return res.status(500).json({
            error: "Failed to login"
        })
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
async function checkUser(req,res){
    // console.log(req.cookies);
    const token = req.cookies?.accessToken
    // console.log(token);
    if (!token) {
        return res.status(200).json({
            data: null
        })
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decodedToken?.id).select("-password")
    if (!user) {
        return res.status(200).json({
            data: null
        })
    }
    return res.status(200).json({
        data: user
    })
}
export {
    checkUser,
    LoginUser,
    registerUser,
    logout
}