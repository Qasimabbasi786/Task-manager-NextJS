import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    // 1. Check karo user hai bhi ya nahi?
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User nahi mila!" }, { status: 404 });
    }

    // 2. Password match karo (Asli vs Hashed)
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "Ghalat Password!", success: false }, { status: 400 });
    }

    // 3. JWT Token banao (Ye user ki identity card ban jayega)
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

    // 4. Token ko Browser ke Cookie mein set karo
    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true, // Takay koi JS ise parh na sakay (Security!)
    });

    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}