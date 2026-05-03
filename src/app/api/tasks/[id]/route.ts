import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";
import { NextResponse } from "next/server";

// Task DELETE karne ke liye
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!id || id === "undefined") {
      return NextResponse.json({ message: "ID is missing or undefined" }, { status: 400 });
    }

    if (!deletedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Delete API Error:", error);
    return NextResponse.json({ message: "Delete failed", error: error.message }, { status: 500 });
  }
}

// Task Status UPDATE karne ke liye (Patch)
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
  
    const updatedTask = await Task.findByIdAndUpdate(id, { $set : body }, { new: true });

    if (!updatedTask) {
      return NextResponse.json({ message: "Task not Found" }, { status: 404 });
    }
    
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error: any) {
    console.error("Update API Error:", error);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}



export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const task = await Task.findById(id);
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}