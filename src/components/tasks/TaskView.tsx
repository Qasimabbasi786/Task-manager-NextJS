"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/layout/Sidebar";
import TaskCard from "@/components/tasks/TaskCard";
import TaskModal from "@/components/tasks/TaskModal";
import { log } from "console";

interface TaskViewProps {
  title: string;
  defaultFilter: "all" | "completed" | "pending";
}

export default function TaskView({ title, defaultFilter }: TaskViewProps) {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null); // Edit ke liye task save karne ke liye

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/api/tasks");
      setTasks(res.data);
    } catch (error) { console.error("Error fetching tasks", error); }
  };

  useEffect(() => { fetchTasks(); }, []);

//   Edit Function
const handleEditClick = (task: any) => {
  setSelectedTask(task); // Task ka data state mein daalo
  setIsModalOpen(true);  // Modal kholo
};

// Filter
  const filteredTasks = tasks.filter((task: any) => {
    if (defaultFilter === "completed") return task.isCompleted;
    if (defaultFilter === "pending") return !task.isCompleted;
    return true;
  });

  
  

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-4 md:p-10">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">{title}</h1>
                <p className="text-slate-500 mt-1">You have {filteredTasks.length} tasks in this section.</p>
            </div>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-blue-200 transition-all active:scale-95"
            >
                + Create Task
            </button>
            </header>

            {filteredTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.map((task: any) => (
                <TaskCard key={task._id} task={task} refreshTasks={fetchTasks} onEdit={handleEditClick}/>
                ))}
            </div>
            ) : (
            <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-slate-200 rounded-4xl bg-white/50">
                <p className="text-slate-400 font-medium">No tasks found here.</p>
            </div>
            )}
        </main>
        <TaskModal 
            key={selectedTask?._id || 'new-task'}
            isOpen={isModalOpen} 
            onClose={() =>{ 
                setIsModalOpen(false)
                setSelectedTask(null); // Modal band hote hi state khali kar do
            }} 
            refreshTasks={fetchTasks} 
            initialData={selectedTask} // Purana data modal ko bhej rahe hain
        />
    </div>
  );
}