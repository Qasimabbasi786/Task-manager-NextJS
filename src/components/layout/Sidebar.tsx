"use client";
import Link from "next/link";
import { LayoutDashboard, CheckCircle2, Clock, LogOut } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20}/>, href: "/" },
    { name: "Completed", icon: <CheckCircle2 size={20}/>, href: "/completed" },
    { name: "Pending", icon: <Clock size={20}/>, href: "/pending" },
  ];

  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Backend API call jo aapne SS mein dikhayi
      await axios.get("/api/auth/logout");
      
      toast.success("Logged out successfully!");
      router.push("/login"); // Logout ke baad login page par bhej dein
    } catch (error) {
      toast.error("Logout fail ho gaya!");
      console.error(error);
    }
  };

  return (
    <aside className="w-64 h-screen bg-slate-900 text-slate-300 fixed left-0 top-0 hidden md:flex flex-col p-6 shadow-xl">
      <div className="text-white text-2xl font-bold mb-10 px-2 tracking-tight">
        Task<span className="text-blue-500">Flow</span>
      </div>
      
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-200 group">
            <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
      
      

      <button onClick={handleLogout} className="mt-auto flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
        <LogOut size={20} /> Logout
      </button>
    </aside>
  );
}