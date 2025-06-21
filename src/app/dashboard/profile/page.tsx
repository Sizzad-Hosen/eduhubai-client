"use client";

import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetMEQuery } from "@/redux/features/userManagement/userMamagement.api";
import StudentProfile from "@/components/profile/StudentProfile";
import TeacherProfile from "@/components/profile/TeacherProfile";
import ResearcherProfile from "@/components/profile/ResearcherProfile";
import ProtectedRoute from "@/components/ProtectedRoute";
import GlobalLoader from "@/components/common/GlobalLoader";

const ProfilePage = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const { data: userData, isLoading, isError } = useGetMEQuery({});

  const role = currentUser?.role;

  return (
    <ProtectedRoute>
      <div className="max-w-5xl mx-auto p-4 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">
          👤 {role?.toUpperCase()} Profile
        </h1>

        {isLoading ? (
        <GlobalLoader></GlobalLoader>
        ) : isError || !userData ? (
          <p className="text-center text-red-500">Error loading profile.</p>
        ) : role === "student" ? (
          <StudentProfile data={userData} />
        ) : role === "teacher" ? (
          <TeacherProfile data={userData} />
        ) : role === "researcher" ? (
          <ResearcherProfile data={userData} />
        ) : (
          <p className="text-center text-gray-500">
            No matching profile component for role: <strong>{role}</strong>
          </p>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;
