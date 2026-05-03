"use client"; // Kyunke hum onClick events use kar rahe hain
import { Calendar, Trash2, CheckCircle, Edit3, Eye } from "lucide-react";
import axios from "axios";
import toast from 'react-hot-toast';
import Link from "next/link";

// TypeScript ko batana ke ye do cheezain props mein ayengi
interface TaskCardProps {
  task: any;
  refreshTasks: () => Promise<void>;
  onEdit: (task: any) => void;
}

export default function TaskCard({ task, refreshTasks, onEdit }: TaskCardProps) {
  
  // 1. Delete Function
  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;
    
    const loadingToast = toast.loading("Deleting task...");

    try {
      await axios.delete(`/api/tasks/${task._id}`);

      toast.success("Task deleted successfully! 🗑️", {
        id: loadingToast,
        style: {
          borderRadius: '15px',
          background: '#333',
          color: '#fff',
        },
      });

      await refreshTasks(); // List refresh ho jayegi
    } catch (error) {
      toast.error("Failed to delete task.", { id: loadingToast });
      console.log("Frontend Error:", error);
    }
  };

  // 2. Toggle Complete Function
  const handleToggleComplete = async () => {
    try {
      await axios.patch(`/api/tasks/${task._id}`, { isCompleted: !task.isCompleted });

      // Notification Logic
    if (!task.isCompleted) {
      // Agar task pehle false tha aur ab true hua hai
      toast.success("Great! Task completed successfully 🎉", {
        duration: 2500,
        position: 'top-right',
        style: {
          borderRadius: '10px',
          background: '#10B981',
          color: '#fff',
          fontSize: '15px',
          fontWeight: 'bold'
        },
      });
    } else {
      // Agar completed task ko wapas pending kiya hai
      toast.error("Task again in pending mode ⏳", {
        icon: '🔄',
        style: {
          borderRadius: '10px',
          background: '#64748b',
          color: '#fff',
          fontSize: '15px',
          fontWeight: 'bold'
        },
      });
    }

      await refreshTasks(); // List refresh ho jayegi
    } 
    catch (error) {
      toast.error("Status update nahi ho saka!");
      console.error("Status update failed", error);
    }
  };

  const priorityColors = {
    high: "bg-red-300 text-red-800 border-red-300",
    medium: "bg-orange-300 text-orange-800 border-orange-300",
    low: "bg-blue-300 text-blue-800 border-blue-300",
  };

  return (
    <div className={`group p-5 rounded-2xl border transition-all duration-300 ${task.isCompleted ? 'bg-slate-50 border-slate-100' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'}`}>
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md border ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
          {task.priority}
        </span>
        

        {/* Action Buttons Container */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* VIEW ICON */}
          <Link href={`/tasks/${task._id}`} className="p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all">
            <Eye size={18}/>
          </Link>

          {/* EDIT ICON */}
          <button onClick={() => onEdit(task)} className="p-2 text-slate-400 hover:bg-amber-50 hover:text-amber-600 rounded-xl transition-all">
            <Edit3 size={18}/>
          </button>
        

        {/* Buttons now have onClick functions */}
        
          <button 
            onClick={handleToggleComplete}
            className={`p-2 rounded-xl transition-all ${task.isCompleted ? 'text-green-600 bg-green-100' : 'text-slate-400 hover:text-blue-500 hover:bg-blue-50'}`}
          >
            <CheckCircle size={18}/>
          </button>
          <button 
            onClick={handleDelete}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={18}/>
          </button>
        </div>
      </div>

      <h3 className={`font-semibold text-slate-800 mb-1 ${task.isCompleted ? 'line-through text-slate-400 font-normal' : ''}`}>
        {task.title}
      </h3>
      <p className="text-sm text-slate-500 line-clamp-2 mb-4">{task.description}</p>

      <div className="flex items-center text-slate-400 text-xs gap-1">
        <Calendar size={14} />
        <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Due Date"}</span>
      </div>
    </div>
  );
}