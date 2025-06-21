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
const [loading,setLoading]= useState(false);

  const [addLogin] = useLoginMutation();
const router = useRouter();
  const [formdata,setFormdata] = useState({
    email: "",
    password: ""
  })

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    // handle form submission here

    try {
 setLoading(true);
      const res = await addLogin(formdata).unwrap();

      const token = res?.data?.accessToken;

      
      const user = verifyToken(res.data.accessToken) as TUser;

      if (!user) {
      throw new Error('Invalid token');
}
      dispatch(setUser({ user, token }));

       if (res.success === true) {
        setLoading(false);
        router.push("/"); 
      toast.success("Login successful!");

    } else {
      toast.error("Login failed!");
    }
 
      // You can redirect the user or show a success message here
    } catch (error) {
  toast.error("Login failed!");
  console.error("Login error:", error);
}

  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value
    });
  };

  if(loading){
   return  <GlobalLoader></GlobalLoader>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg max-w-md w-full p-8 space-y-6"
        noValidate
      >
        <h2 className="text-2xl font-semibold text-center text-gray-900">Welcome Back</h2>

        <div>
          <Label htmlFor="email" className="mb-1">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={formdata.email}
            onChange={onChange}
            required
           
            aria-describedby="email-error"
            className={ "border-red-500 focus:ring-red-500"  }
          />
          
         
        </div>

        <div>
          <Label htmlFor="password" className="mb-1">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Your password"
            value={formdata.password}
            onChange={onChange}
            required
          
            aria-describedby="password-error"
            className={ "border-red-500 focus:ring-red-500"}
          />
         
        </div>

        <Button type="submit" className="w-full">
          Log In
        </Button>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="registration" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
