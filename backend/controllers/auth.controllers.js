import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

import {User} from "../models/user.model.js";
import {generateVerificationToken} from "../utils/generateVerificationToken.js";
import {generateTokenAndSetCookie} from "../utils/generateTokenAndSetCookie.js";
import {sendPasswordResetEmail,
	      sendResetSuccessEmail,
	      sendVerificationEmail,
	      sendWelcomeEmail 
      }from "../mailtrap/emails.js";

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

    await sendVerificationEmail(user.email,verificationToken);

    return res.status(201).json({
      success:true,
      message:"User created successfully",
      user:{
        ...user._doc,
        password: undefined, // Exclude password from the response
      }
    });

  } catch (error) {
    return res.status(400).json({success:false,message:error.message});
  }
};

export const verifyEmail = async (req, res) => {
  const {code} = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code, 
      verificationTokenExpiresAt: {$gt: new Date()}
    });
    if (!user) {
      return res.status(400).json({success: false, message: "Invalid or expired verification code"});
    }

    user.isVerified = true;
    user.verificationToken = undefined; // Clear the verification token
    user.verificationTokenExpiresAt = undefined; // Clear the expiration date
    await user.save();

    await sendWelcomeEmail(user.email, user.name); 

    res.status(200).json({
      success: true, 
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined, // Exclude password from the response
      },
    });
  } catch (error) {
    console.log("error in verifyEmail", error);
    res.status(500).json({success:false, message: "Internal server error"});
  }
};

export const login = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({success: false, message: "Invalid email or password"});
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({success: false, message: "Invalid email or password"});
    }

    generateTokenAndSetCookie(res, user._id); 

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        ...user._doc,
        password: undefined, // Exclude password from the response
      },
    });
  } catch (error) {
    console.log("Error in login:", error);
    res.status(400).json({success: false, message: error,message});
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({success: true, message: "Logged out successfully"});
};

export const forgotPassword = async (req, res) => {
  const {email} = req.body;
 try {
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({success: false, message: "User not found"});
  }
  // Generate a password reset token
  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // Token valid for 1hour

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpiresAt = resetTokenExpiresAt;

  await user.save();

  // Send email
 await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);


  res.status(200).json({
    success: true,
    message: "Password reset email sent successfully",
  });

} catch (error) {
  console.error("Error in forgotPassword:", error);
  res.status(400).json({success: false, message: "Internal server error"});
 }
};

export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		// update password
		const hashedPassword = await bcryptjs.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};


export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};