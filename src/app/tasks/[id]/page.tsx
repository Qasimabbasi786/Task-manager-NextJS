"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Sidebar from "@/components/layout/Sidebar";
import { ArrowLeft, Calendar, Tag, CheckCircle2, Clock } from "lucide-react";

export default function TaskDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [task, setTask] = useState<any>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`/api/tasks/${id}`);
        setTask(res.data);
      } catch (error) { console.error(error); }
    };
    fetchTask();
  }, [id]);

  if (!task) return <div className="p-10 text-center text-slate-500 font-bold">Loading Task...</div>;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-6 md:p-12">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 transition-all">
          <ArrowLeft size={20}/> Back to Dashboard
        </button>

        <div className="max-w-3xl bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${task.priority === 'high' ? 'bg-red-50 text-red-600 border-red-100' : `${task.priority === 'medium' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-green-50 text-blue-600 border-green-100'}`}`}>
              {task.priority} Priority
            </span>
            <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${task.isCompleted ? 'bg-green-50 text-green-600 border-green-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
              {task.isCompleted ? 'Completed' : 'Pending'}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">{task.title}</h1>
          
          <div className="flex items-center gap-6 mb-10 pb-10 border-b border-slate-50 text-slate-500">
            <div className="flex items-center gap-2 font-medium">
              <Calendar size={18} className="text-blue-500" />
              {new Date(task.dueDate).toLocaleDateString('en-GB', { dateStyle: 'full' })}
            </div>
          </div>

          <div className="prose max-w-none text-slate-600 leading-relaxed text-lg">
            <h3 className="text-slate-900 font-bold mb-3 uppercase tracking-tighter text-sm">Description</h3>
            <p>{task.description || "No description provided for this task."}</p>
          </div>
        </div>
      </main>
    </div>
  );
}