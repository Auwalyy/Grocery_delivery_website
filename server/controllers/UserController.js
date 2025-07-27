import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


// Register User : api/user/register
export const register = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "User already exists" });
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashPassword });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie("token", token, {
            httpOnly: true, // prevent javascript access to the cookie
            secure: process.env.NODE_ENV === 'production', // use secure cook in production
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict', // set SameSite attribute\
            maxAge: 7 * 24 * 60 * 60 * 1000 // cookie expires in 7 days
        });
        return res.json({
            success: true,
            message: "User registered successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Error in user registration:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}