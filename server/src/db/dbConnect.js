import mongoose from "mongoose";

export default async function connect(){
    try {
        const res = await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected successfully.')
    } catch (error) {
        return res.status(501).json({
            error: "Failed to connect to the database"
        })
    }
}