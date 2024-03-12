import jwt from "jsonwebtoken"
import  User from "../models/user.model.js";

export async function verifyJWT (req, _, next) {
    // console.log(req.cookies?.accessToken);
    // try {
        
        const token = req.cookies?.accessToken
        
        // console.log(token);
        if (!token) {
            return res.status(401).json({
                error: "Access token is missing"
            })
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        // console.log(decodedToken);
        const user = await User.findById(decodedToken?.id).select("-password")
        // console.log(user);
        if (!user) {
            
            return res.status(401).json({
                error: "User not found"
            })
        }
    
        req.user = user;
        next()
    // } catch (error) {
    //     throw new Error(401, error?.message || "Invalid access token")
    // }
    
}