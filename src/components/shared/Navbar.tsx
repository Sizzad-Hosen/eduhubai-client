"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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
  Bell,
  ChartBarStackedIcon,
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
import { useGetMEQuery } from "@/redux/features/userManagement/userMamagement.api";


export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();

const handleLogout = () => {
  // 1. Clear redux-persist data first (if needed)
  localStorage.removeItem('persist:root'); 
  localStorage.removeItem('token'); 

  // 2. Dispatch redux logout to reset auth state
  dispatch(logout());

  // 3. Navigate to login page after state is updated
  router.push('/login');
};


  const auth = useAppSelector((state) => state.auth);
 const user = useAppSelector(selectCurrentUser);
 console.log("User in Navbar:", user);
 
  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={16} /> },
    { name: "Students", href: "/students", icon: <Users size={16} /> },
    { name: "Researchers", href: "/researchers", icon: <Users size={16} /> },
    { name: "Teachers", href: "/teachers", icon: <Users size={16} /> },
    { name: "AIAssistance", href: "/research-assistant", icon: <ChartBarStackedIcon size={16} /> },
   
  
  ];

  const { data } = useGetMEQuery({});
  


  return (
    <nav className="border-b bg-slate-900 font-bold text-white shadow-md top-0 z-50">

      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        <Link href="/" className="text-xl text-white font-bold ">
          <img 
          src={"https://i.postimg.cc/Qtw1MT39/logo-removebg-preview.png"} 
          width={120}
           height={120}
            alt="logo" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
           <Link
              key={link.href}
              href={link.href}
              className={`relative flex items-center gap-1 text-sm font-medium text-white transition duration-300 group ${
                pathname === link.href ? "text-blue-400" : "hover:text-blue-400"
              }`}
            >
              {link.icon}
              {link.name}

              {/* Underline hover effect */}
              <span
                className={`absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-400 transition-all duration-300 group-hover:w-full ${
                  pathname === link.href ? "w-full" : ""
                }`}
              />
            </Link>

          ))}

          {/* Search Input */}
          <div className="w-48">
            <Input placeholder="Search..." className="text-sm" />
          </div>

        
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="w-8 h-8">
                  {
                    data?.profileImg ? (

                      <AvatarImage src={data?.profileImg} />
                    ) : (
                    <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Avatar_The_Way_of_Water_Tokyo_Press_Conference_Stephen_Lang_%2852563431575%29_%28cropped%29.jpg/250px-Avatar_The_Way_of_Water_Tokyo_Press_Conference_Stephen_Lang_%2852563431575%29_%28cropped%29.jpg" />
                 
                    )
                  }
                 
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
                     <button
                onClick={handleLogout}
                className="text-sm text-left text-red-600 py-1"
              >
                Logout
              </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* notification */}
            <Button variant="secondary" size="sm" asChild>
                <Link href="/notification" className="flex items-center gap-1">
                <Bell size={16} />

                Notification
              </Link>
            </Button>
        
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" variant="secondary" size="sm" asChild>
              <Link href="/registration" className="flex items-center gap-1">
                <UserCircle  className="mr-2 h-4 w-4" size={16} />
                Register
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
        <div className="md:hidden pt-2 px-4 pb-4 space-y-2 bg-white font-bold  text-gray-900 shadow-sm">
          {navLinks.map((link) => (
           <Link
              key={link.href}
              href={link.href}
              className={`relative flex items-center gap-1 text-sm font-medium  transition duration-300 group ${
                pathname === link.href ? "text-blue-400" : "hover:text-blue-400"
              }`}
            >
              {link.icon}
              {link.name}

              {/* Underline hover effect */}
              <span
                className={`absolute left-0 -bottom-1 h-0.5 w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full ${
                  pathname === link.href ? "w-full" : ""
                }`}
              />
            </Link>

          ))}
          <Input placeholder="Search..." className="text-sm" />
       
            <div className="pt-2">
              <Link href="/dashboard" className="block text-sm py-1">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-left text-red-600 py-1"
              >
                Logout
              </button>
            </div>
        
            <div className="flex justify-between">
              {/* notification */}
            <Button variant="secondary" size="sm" asChild>
                <Link href="/notification" className="flex items-center gap-1">
                <Bell size={16} />

                Notification
              </Link>
            </Button>
        
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" variant="secondary" size="sm" asChild>
              <Link href="/registration" className="flex items-center gap-1">
                <UserCircle  className="h-4 w-4" size={16} />
                Register
              </Link>
            </Button>

            </div>
            
      
        </div>
      )}
    </nav>
  );
}
