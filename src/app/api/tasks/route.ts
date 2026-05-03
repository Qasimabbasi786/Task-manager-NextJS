import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// --- Helper function user ID nikalne ke liye ---
const getUserIdFromToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);
  return decoded.id;
};

// 1. CREATE Task (POST)
export async function POST(request: Request) {
  try {
    await dbConnect();
    const userId = await getUserIdFromToken();
    const { title, description, priority, dueDate } = await request.json();

    const newTask = await Task.create({
      title,
      description,
      priority,
      dueDate,
      userId,
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating task" }, { status: 500 });
  }
}

// 2. GET All Tasks for logged-in user
export async function GET() {
  try {
    await dbConnect();

    // 1. Token nikaalo
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || "";

    if (!token) {
      return NextResponse.json({ message: "Unauthorized: No token found" }, { status: 401 });
    }

    // 2. Token verify karo try-catch ke andar
    let userId;
    try {
      const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);
      userId = decoded.id;
    } catch (err) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }

    // 3. Tasks fetch karo
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json(tasks);

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}