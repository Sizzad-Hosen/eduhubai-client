"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import clsx from "clsx";

const navLinks = [
  { name: "Profile", href: "/dashboard/profile" },
  { name: "User Management", href: "/dashboard/user-management" },
  { name: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-8 text-blue-600">EduHubAI</h2>
        <nav className="space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "block px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700",
                pathname === link.href
                  ? "bg-blue-500 text-white"
                  : "text-gray-800 dark:text-gray-300"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
