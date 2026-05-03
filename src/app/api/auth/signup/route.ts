import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await dbConnect(); // DB se dosti karlo

    // User jo data bhej raha hai wo nikalo
    const { username, email, password } = await request.json();

    // 1. Check karo user pehle se to nahi hai?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // 2. Password ko "Hash" karo (Matlab kachra bana do taake koi parh na sakay)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Naya user save karo
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error registering user", error }, { status: 500 });
  }
}