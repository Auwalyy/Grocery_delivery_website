import mongoose from 'mongoose';
import dotenv from 'dotenv';



const connectDB = async() => {
    try {
        mongoose.connection.on("connected", () => console.log("Database Connected"));

        await mongoose.connect(`${process.env.MONGODB_URI}/greencart`)
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); // Exit the process with failure
    }
}

export default connectDB;