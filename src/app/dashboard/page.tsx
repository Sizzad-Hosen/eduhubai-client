"use client"

import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { BookOpen, CheckCircle } from "lucide-react";

export default function DashboardHome() {
  const user = useAppSelector(selectCurrentUser);
  const userName = user?.firstName || "Valued User";
  const userRole = user?.role || "student"; // Assuming role is stored in user object

  const activities = [
    { id: 1, title: "Advanced React Concepts", progress: 75, due: "3 days left" },
    { id: 2, title: "Database Design", progress: 42, due: "1 week left" },
    { id: 3, title: "UI/UX Principles", progress: 15, due: "2 weeks left" },
  ];

  if (userRole !== "student") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-center h-full">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome, {userName}!
            </h1>
            <p className="text-xl text-gray-600">
              {userRole === "teacher" 
                ? "Teacher dashboard coming soon!" 
                : "Researcher dashboard coming soon!"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, <span className="text-indigo-600">{userName}</span>!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your learning journey today
          </p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Courses in Progress</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2">3</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Completion Rate</h3>
            <p className="text-3xl font-bold text-emerald-600 mt-2">64%</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Streak</h3>
            <p className="text-3xl font-bold text-amber-500 mt-2">7 days</p>
          </div>
        </div>

        {/* Curriculum Activity */}
        <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Your Curriculum</h2>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              View All
            </button>
          </div>

          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="group">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium text-gray-800">{activity.title}</h3>
                  <span className="text-sm text-gray-500">{activity.due}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-indigo-400 to-purple-500 h-2.5 rounded-full"
                    style={{ width: `${activity.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 p-2 rounded-full">
                <BookOpen className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="font-medium">Completed "React Fundamentals" lesson</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Submitted "Database Design" assignment</p>
                <p className="text-sm text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}