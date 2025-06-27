"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Github, Linkedin } from "lucide-react"; // ✅ You must have lucide-react installed

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white shadow-md px-6   py-8 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="https://i.postimg.cc/Qtw1MT39/logo-removebg-preview.png"
            alt="EduHubAI Logo"
            width={80}
            height={80}
            className="object-contain"
          />
          <span className="text-2xl font-bold text-white hidden sm:block">EduHubAI</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm sm:text-base">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/students" className="hover:text-white transition">Students</Link>
          <Link href="/researchers" className="hover:text-white transition">Researchers</Link>
          <Link href="/teachers" className="hover:text-white transition">Teachers</Link>
          <Link href="/dashboard" className="hover:text-white transition">Dashboard</Link>
          <Link href="/about" className="hover:text-white transition">About</Link>
        </div>

        {/* Credits & Social */}
        <div className="flex flex-col md:items-end gap-2">
          <p className="text-sm text-center md:text-right">
            Developed by <span className="text-white font-semibold">Commando Team</span> | 
            Developer: <span className="text-white font-semibold">Md. Sizzad Hosen</span>
          </p>
          <div className="flex gap-4 justify-center md:justify-end">
            <Link href="https://facebook.com/sizzad.hosen" target="_blank">
              <Facebook className="w-5 h-5 hover:text-blue-500 transition" />
            </Link>
            <Link href="https://linkedin.com/in/sizzad-hosen" target="_blank">
              <Linkedin className="w-5 h-5 hover:text-blue-400 transition" />
            </Link>
            <Link href="https://github.com/Sizzad-Hosen" target="_blank">
              <Github className="w-5 h-5 hover:text-gray-100 transition" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
