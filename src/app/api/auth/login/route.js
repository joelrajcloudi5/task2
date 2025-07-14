"use server";
import UserModel from "@/app/models/UserModel";
import connectDB from "@/app/utils/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const POST = async (req) => {
  try {
    await connectDB();

    const { email, password, otp } = await req.json();

    const user = await UserModel.findOne({ email });
    if (!user) {
      return Response.json({ message: "Invalid email" }, { status: 401 });
    }

    if (user.isLoggedIn) {
      return Response.json({ message: "User is already logged in" }, { status: 403 });
    }

    let isAuthenticated = false;

    // Password-based login
    if (password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        isAuthenticated = true;
      } else {
        return Response.json({ message: "Invalid password" }, { status: 401 });
      }
    }
    // OTP-based login
    else if (otp) {
      const isOtpValid =
        user.otp === otp &&
        user.otpExpires &&
        user.otpExpires > new Date();

      if (isOtpValid) {
        isAuthenticated = true;
      } else {
        return Response.json({ message: "Invalid or expired OTP" }, { status: 401 });
      }
    }
    // No method provided
    else {
      return Response.json({ message: "Password or OTP required" }, { status: 400 });
    }

    // Finalize login
    if (isAuthenticated) {
      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email, // ✅ this is now included
          role: user.role || "user",
        },
        JWT_SECRET,
        { expiresIn: "2h" }
      );

      user.isLoggedIn = true;
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();

      return Response.json({ token, message: "Login successful" }, { status: 200 });
    }

    return Response.json({ message: "Authentication failed" }, { status: 401 });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
};
