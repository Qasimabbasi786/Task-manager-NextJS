import mongoose, { Schema, Document } from "mongoose";

// 1. TypeScript Interface: Code likhte waqt humein pata ho ke task mein kya kya hai
export interface ITask extends Document {
  title: string;
  description: string;
  isCompleted: boolean;
  priority: "low" | "medium" | "high"; // Sirf ye 3 values allow hongi
  dueDate?: Date;
  userId: mongoose.Schema.Types.ObjectId; // Kis user ka task hai?
  createdAt: Date;
}

// 2. Mongoose Schema: Database mein data kaise save hoga
const TaskSchema = new Schema<ITask>({
  title: { type: String, required: [true, "Title must required!"] },
  description: { type: String },
  isCompleted: { type: Boolean, default: false },
  priority: { 
    type: String, 
    enum: ["low", "medium", "high"], 
    default: "medium" 
  },
  dueDate: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

// 3. Model Export: Agar model pehle se bana hai to wo use karo, warna naya banao
const Task = mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);

export default Task;