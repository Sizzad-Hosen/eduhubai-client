"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { verifyToken } from "@/utils/verifyToken";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { useRouter } from "next/navigation";
import GlobalLoader from "@/components/common/GlobalLoader";

const Login = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [addLogin] = useLoginMutation();
  const router = useRouter();

  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await addLogin(formdata).unwrap();
      const token = res?.data?.accessToken;
      const user = verifyToken(token) as TUser;
      if (!user) throw new Error("Invalid token");
      dispatch(setUser({ user, token }));
      if (res.success === true) {
        setLoading(false);
        router.push("/");
        toast.success("Login successful!");
      } else {
        toast.error("Login failed!");
      }
    } catch (error) {
      toast.error("Login failed!");
      console.error("Login error:", error);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };

  if (loading) return <GlobalLoader />;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-sky-900 via-slate-900 to-gray-900 relative overflow-hidden">
      <div className="w-full max-w-md bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 space-y-6 z-10 border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white">Welcome Back 👋</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="email" className="text-gray-300">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={formdata.email}
              onChange={onChange}
              required
              className="mt-1 bg-gray-700/50 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-300">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formdata.password}
              onChange={onChange}
              required
              className="mt-1 bg-gray-700/50 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Log In
          </Button>
        </form>

        <p className="text-center text-sm text-gray-300">
          Don't have an account?{" "}
          <a href="/registration" className="text-blue-400 hover:underline font-medium">
            Sign up
          </a>
        </p>
      </div>

      {/* Gradient overlay blur for design */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 opacity-60 blur-3xl z-0" />
    </div>
  );
};

export default Login;