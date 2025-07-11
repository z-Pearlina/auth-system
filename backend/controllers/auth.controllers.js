import {User} from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import {generateVerificationToken} from "../utils/verificationCodeGenerator.js";
export const signup = async (req, res) => {
  const{email,password,name} = req.body;
  try {
    if(!email || !password || !name) {
       throw new Error("Please provide all fields");
    }

    const userAlreadyExists = await User.findOne({email});
    if(userAlreadyExists) {
      return res.status(400).json({success:false,message: "User already exists"});
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = generateVerificationToken(); // Assuming you have a function to generate a verification code
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // Token valid for 24 hours
    });

    await user.save();

    //jwt
    generateTokenAndSetCookie(res,user._id);
  } catch (error) {
    return res.status(400).json({success:false,message:error.message});
  }
}

export const login = async (req, res) => {
  res.send("Login Route");
}

export const logout = async (req, res) => {
  res.send("Logout Route");
}