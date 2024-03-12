import jwt from "jsonwebtoken"
import  User from "../models/user.model.js";

export async function verifyJWT (req, _, next) {
    // console.log(req.cookies?.accessToken);
    // try {
        console.log("asdsa: ",req.cookies);
        const token = req.cookies?.accessToken;
        
        console.log(token);
        if (!token) {
            throw new Error(300, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        // console.log(decodedToken);
        const user = await User.findById(decodedToken?.id).select("-password")
        // console.log(user);
        if (!user) {
            
            throw new Error(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    // } catch (error) {
    //     throw new Error(401, error?.message || "Invalid access token")
    // }
    
}