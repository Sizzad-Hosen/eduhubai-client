"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Search,
  LogIn,
  LogOut,
  Menu,
  X,
  UserCircle,
  LayoutDashboard,
  Info,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/redux/hook";
import { useDispatch } from "react-redux";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const auth = useAppSelector((state) => state.auth);
 const user = useAppSelector(selectCurrentUser);
 console.log("User in Navbar:", user);
 

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={16} /> },
    { name: "About", href: "/about", icon: <Info size={16} /> },
    { name: "Student", href: "/student", icon: <Users size={16} /> },
    { name: "Researcher", href: "/researcher", icon: <Users size={16} /> },
    { name: "Teacher", href: "/teacher", icon: <Users size={16} /> },
    { name: "Advanced Search", href: "/search", icon: <Search size={16} /> },
  
  ];

  return (
    <nav className="border-b shadow-sm bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          EduHubAI
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1 text-sm font-medium hover:text-blue-600 transition ${
                pathname === link.href ? "text-blue-600" : "text-gray-700"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}

          {/* Search Input */}
          <div className="w-48">
            <Input placeholder="Search..." className="text-sm" />
          </div>

        
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/avatar.png" />
                  <AvatarFallback>SH</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                 
                  className="flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        
            <Button variant="outline" size="sm" asChild>
              <Link href="/login" className="flex items-center gap-1">
                <LogIn size={16} />
                Login
              </Link>
            </Button>
      
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-2 text-sm ${
                pathname === link.href ? "text-blue-600 font-semibold" : "text-gray-700"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Input placeholder="Search..." className="text-sm" />
       
            <div className="pt-2">
              <Link href="/dashboard" className="block text-sm py-1">
                Dashboard
              </Link>
              <button
                onClick={() => dispatch(logout())}
                className="text-sm text-left text-red-600 py-1"
              >
                Logout
              </button>
            </div>
        
            <Link
              href="/login"
              className="block text-blue-600 text-sm font-medium py-2"
            >
              Login
            </Link>
      
        </div>
      )}
    </nav>
  );
}
