"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";


interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshTasks: () => Promise<void>;
  initialData?: any; // ? ka matlab hai ye optional hai (Create ke waqt nahi hota)
}


export default function TaskModal({ isOpen, onClose, refreshTasks, initialData }: any) {
  const [task, setTask] = useState({ title: "", description: "", priority: "medium", dueDate: "" });

  // Jab bhi initialData change ho (yani edit button dabayein), form bhar do
  useEffect(() => {
    if (isOpen) {
      if (isOpen && initialData) { 
        setTask({
          title: initialData.title || "",
          description: initialData.description || "",
          priority: initialData.priority || "low",
          dueDate: initialData.dueDate ? initialData.dueDate.split('T')[0] : ""
        });
      } else if (isOpen && !initialData){
        setTask({ title: "", description: "", priority: "low", dueDate: "" });
      }
    }
  }, [initialData, isOpen]);

  
  const handleSubmit = async (e: React.FormEvent) => {
  
  
  
  
    e.preventDefault();
    try {
      if (initialData) {
        // Agar data pehle se hai to PATCH (Update) karo
        await axios.patch(`/api/tasks/${initialData._id}`, task);
        toast.success("Task updated successfully! ✨");
      } else {
        // Warna POST (Create) karo
        await axios.post("/api/tasks", task);
        toast.success("New task created! 🚀");
      }
      refreshTasks(); // Tasks update karne ke liye
      onClose(); // Modal band karne ke liye
    } catch (error) { console.error(error); }
  };


  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl scale-in-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" placeholder="Task Title" required
            value={task.title}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setTask({...task, title: e.target.value})}
          />
          <textarea 
            placeholder="Description"
            value={task.description}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setTask({...task, description: e.target.value})}
          />
          <div className="grid grid-cols-2 gap-4">
            <select 
              className="px-4 py-3 rounded-xl border border-slate-200 outline-none"
              value={task.priority}
              onChange={(e) => setTask({...task, priority: e.target.value})}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input 
              type="date"
              value={task.dueDate} 
              className="px-4 py-3 rounded-xl border border-slate-200 outline-none"
              onChange={(e) => setTask({...task, dueDate: e.target.value})}
            />
          </div>
          <div className="flex gap-3 mt-6">
            <button type="button" onClick={onClose} className="flex-1 py-3 text-slate-500 font-medium">Cancel</button>
            {!initialData ? (
              <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200">Create</button>
            ) : (
              <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200">Edit</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}