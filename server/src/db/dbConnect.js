import mongoose from "mongoose";

export default async function connect(){
    try {
        const res = await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected successfully. MongoHost:',res.connection.host)
    } catch (error) {
        console.log('MongoDB connection failed',error)
    }
}