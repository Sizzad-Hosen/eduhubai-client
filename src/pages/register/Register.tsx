"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Register() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4 bg-gray-50">
      <h1 className="text-2xl font-bold">Register to EduHubAI</h1>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Button onClick={() => router.push("/register/student")} className="w-full">
          Register as Student
        </Button>
        <Button onClick={() => router.push("/register/teacher")} className="w-full">
          Register as Teacher
        </Button>
        <Button onClick={() => router.push("/register/researcher")} className="w-full">
          Register as Researcher
        </Button>
      </div>
    </div>
  );
}
