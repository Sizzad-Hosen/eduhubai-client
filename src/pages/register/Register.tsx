"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import GlobalLoader from "@/components/common/GlobalLoader";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleNavigate = (path: string) => {
    setLoading(true);

    // Wait briefly to let loader render before navigating
    setTimeout(() => {
      router.push(path);
    }, 400); // Optional: adjust duration
  };

  if (loading) {
    return <GlobalLoader />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4 bg-gray-50">
      <h1 className="text-3xl font-bold text-cyan-700">Register to EduHubAI</h1>

      <div className="flex flex-col gap-4 w-full max-w-sm mt-4">
        <Button onClick={() => handleNavigate("/register/student")} className="w-full">
          Register as Student
        </Button>
        <Button onClick={() => handleNavigate("/register/teacher")} className="w-full">
          Register as Teacher
        </Button>
        <Button onClick={() => handleNavigate("/register/researcher")} className="w-full">
          Register as Researcher
        </Button>
      </div>
    </div>
  );
}
