"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Search, LogIn, LogOut, UserCircle, LayoutDashboard } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Student", href: "/student" },
  { label: "Researcher", href: "/researcher" },
  { label: "Teacher", href: "/teacher" },
  { label: "Advanced Search", href: "/search" },
  { label: "Login", href: "/login" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // change this based on auth
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">EduHubAI</div>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-blue-600 transition ${
                pathname === item.href ? "text-blue-600 font-medium" : "text-gray-700"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-full px-3 py-1 text-sm outline-none"
            />
            <Search className="absolute top-1.5 right-2 w-4 h-4 text-gray-500" />
          </div>

          {/* Avatar & Auth Buttons */}
          {isLoggedIn ? (
            <div className="relative group">
              <UserCircle className="w-7 h-7 text-gray-700 cursor-pointer" />
              <div className="absolute right-0 top-8 bg-white border rounded shadow-md hidden group-hover:block w-36 z-50">
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm flex items-center gap-2"
                >
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-1 text-blue-600 hover:underline">
              <LogIn size={18} /> Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block py-1 border-b ${
                pathname === item.href ? "text-blue-600 font-medium" : "text-gray-700"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 mt-2">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded px-3 py-1 text-sm w-full"
            />
            <Search size={18} />
          </div>
          {isLoggedIn ? (
            <div className="flex flex-col gap-1 mt-2">
              <Link href="/dashboard" className="text-sm flex items-center gap-2">
                <LayoutDashboard size={16} /> Dashboard
              </Link>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="text-sm flex items-center gap-2 text-left"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="text-blue-600 text-sm flex items-center gap-2 mt-2">
              <LogIn size={16} /> Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
