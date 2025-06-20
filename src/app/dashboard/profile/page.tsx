"use client";

import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetMEQuery } from "@/redux/features/userManagement/userMamagement.api";
import StudentProfile from "@/components/profile/StudentProfile";

import TeacherProfile from "@/components/profile/ResearcherProfile";
import ResearcherProfile from "@/components/profile/ResearcherProfile";

const ProfilePage = () => {

  const { data: userData, isLoading, isError } = useGetMEQuery({});

  const currentUser = useAppSelector(selectCurrentUser);

  if (isLoading) return <p>Loading profile...</p>;
  if (isError || !userData) return <p>Error loading profile</p>;

  const role = currentUser?.role;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">👤 {role?.toUpperCase()} Profile</h1>

      {role === "student" && (
        <>
          {/* <StudentDetails data={userData} /> */}
          <StudentProfile data={userData} />
        </>
      )}
      {role === "teacher" && (
     <>
          <TeacherProfile data={userData} />
          {/* <TeacherDetails data={userData} /> */}
        </>

      
      )}      
   
      {role === "researcher" && (
      <>
          <ResearcherProfile data={userData} />
          {/* <ResearcherDetails data={userData} /> */}
        </>
      )}
      {/* 
      {/* {role === "admin" && <AdminProfile data={userData} />} */}

      {!["student", "teacher", "researcher", "admin"].includes(role ?? "") && (
        <p>No matching profile UI for role: {role}</p>
      )}
    </div>
  );
};

export default ProfilePage;
