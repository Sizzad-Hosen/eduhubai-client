"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  UserCog,
  Settings,
  BookOpen,
  Menu,
  X,
} from "lucide-react";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser);

  // ✅ Build navigation links based on role
  const navLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: <UserCog className="h-5 w-5" />,
    },
    // Show only if role === 'admin'
    ...(user?.role === "admin"
      ? [
          {
            name: "User Management",
            href: "/dashboard/user-management",
            icon: <BookOpen className="h-5 w-5" />,
          },
        ]
      : []),
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Topbar on Mobile */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 border-b bg-white dark:bg-gray-800 shadow-sm">
        <h2 className="text-xl font-bold text-indigo-600">EduHubAI</h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-700 dark:text-gray-200"
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed md:static top-0 left-0 z-40 w-72 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-xl transition-transform duration-300 ease-in-out",
          {
            "-translate-x-full md:translate-x-0": !isSidebarOpen,
            "translate-x-0": isSidebarOpen,
          }
        )}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            EduHubAI
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Premium Education Platform
          </p>
        </div>

        <nav className="p-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                pathname === link.href
                  ? "bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 text-blue-600 dark:text-white shadow-sm"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
              )}
              onClick={() => setIsSidebarOpen(false)} // close on mobile
            >
              <span
                className={clsx(
                  pathname === link.href
                    ? "text-blue-500"
                    : "text-gray-500 dark:text-gray-400"
                )}
              >
                {link.icon}
              </span>
              <span className="font-medium">{link.name}</span>
              {pathname === link.href && (
                <span className="ml-auto h-2 w-2 rounded-full bg-blue-500" />
              )}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-xl p-4 sm:p-6 ">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
