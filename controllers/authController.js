import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

//Sign up 
export const signup = async (req, res) => {
  const { username, password } = req.body;
  try {

    const user = await User.findOne({ username });
      if (user) return res.status(404).json({ message: "User alkready exist" });

    const newUser = new User({ username, password: password });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login 
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    if(password !== user.password){
        return res.status(400).json({ message: "Wrong Password" });
    }


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


