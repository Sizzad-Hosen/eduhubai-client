"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import GlobalLoader from "@/components/common/GlobalLoader";
import Link from "next/link";
import { motion } from "framer-motion";

// Create an array of 100 airplanes
const airplanes = Array.from({ length: 100 }, (_, i) => i);

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleNavigate = (path: string) => {
    setLoading(true);
    setTimeout(() => {
      router.push(path);
    }, 400);
  };

  if (loading) return <GlobalLoader />;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-900 via-slate-900 to-gray-900 px-4 py-12 relative overflow-hidden">
      {/* ✈️ 100 Airplanes flying across screen */}
      {airplanes.map((_, i) => {
        const delay = Math.random() * 10; // Delay between 0 and 15s
        const duration = 20 + Math.random() * 10; // Duration between 20 and 30s (slow)
        const top = Math.random() * 90 + 5; // Top position between 5vh and 95vh for good spread

        return (
          <motion.div
            key={i}
            className="absolute text-white text-xs md:text-sm font-semibold flex items-center gap-2 pointer-events-none select-none"
            style={{ top: `${top}vh`, whiteSpace: "nowrap" }}
            initial={{ x: "-120vw" }}
            animate={{ x: "110vw" }}
            transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
          >
            <span className="text-2xl md:text-xl">✈️</span>
            <span className="tracking-wide">Register</span>
          </motion.div>
        );
      })}

      {/* Registration Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 w-full max-w-xl bg-black/80 backdrop-blur-md shadow-2xl rounded-3xl p-10 space-y-10 border border-white/20"
      >
        
        <h1 className="text-4xl font-extrabold text-center text-white tracking-wide drop-shadow-lg">
          Register to EduHubAI
        </h1>

        <div className="flex flex-col gap-6">
          <Button
            onClick={() => handleNavigate("/register/student")}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 rounded-xl shadow-lg transition"
          >
            Register as Student
          </Button>
          <Button
            onClick={() => handleNavigate("/register/teacher")}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-xl shadow-lg transition"
          >
            Register as Teacher
          </Button>
          <Button
            onClick={() => handleNavigate("/register/researcher")}
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-4 rounded-xl shadow-lg transition"
          >
            Register as Researcher
          </Button>
        </div>

        <p className="text-center text-lg text-gray-300">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-400 hover:underline font-semibold">
            Login
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
