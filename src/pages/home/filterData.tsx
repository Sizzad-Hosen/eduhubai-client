"use client";

import React from "react";
import { useGetFilterWiseQuery, useGetMEQuery } from "@/redux/features/userManagement/userMamagement.api";
import ProfileCard from "@/components/common/ProfileCard";
import { motion } from "framer-motion";
import GlobalLoader from "@/components/common/GlobalLoader";

const FilterData = () => {
  const { data: currentUser, isLoading: isUserLoading, isError: isUserError } = useGetMEQuery({});

  const {
    data: matches,
    isLoading: isMatchesLoading,
    isError: isMatchesError,
  } = useGetFilterWiseQuery(
    [
      { name: "city", value: currentUser?.address?.city || "" },
      { name: "skill", value: currentUser?.skill || [] },
      { name: "expertise", value: currentUser?.expertise || "" },
      { name: "researchArea", value: currentUser?.researchArea || "" },
      { name: "academicInterests", value: currentUser?.academicInterests || [] },
      { name: "page", value: 1 },
      { name: "limit", value: 10 },
      { name: "sortBy", value: "name" },
      { name: "sortOrder", value: "asc" },
    ],
    { skip: !currentUser }
  );

  const isLoading = isUserLoading || isMatchesLoading;
  const isError = isUserError || isMatchesError;

  const renderSection = (title: string, users: any[]) => {
    if (!users?.length) return null;

    return (
      <section className="mb-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-cyan-800 dark:text-cyan-400 mb-6 border-b-2 border-cyan-300 pb-2">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((user, index) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <ProfileCard
                userType={
                  user?.role === "student"
                    ? "students"
                    : user?.role === "teacher"
                    ? "teachers"
                    : "researchers"
                }
                city={user?.address?.city}
                id={user?._id}
                profileImg={user?.profileImg}
                presentAddress={user?.address?.presentAddress}
                bsc={user?.bsc}
                skills={user?.skill}
                user={user}
                name={user?.name}
                email={user?.email}
              />
            </motion.div>
          ))}
        </div>
      </section>
    );
  };

  const result = matches?.data?.result;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-6">
      <h1 className="max-w-4xl mx-auto text-5xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-cyan-700 via-blue-600 to-purple-700 text-transparent bg-clip-text mb-16 select-none drop-shadow-lg">
        Discover People Who Match You
      </h1>

      {isLoading ? (
        <div className="flex justify-center">
          <GlobalLoader />
        </div>
      ) : isError ? (
        <p className="text-center text-red-500 text-lg font-medium">Failed to load data. Please try again later.</p>
      ) : (
        <>
          {renderSection("Researchers", result?.researcherMatches ?? [])}
          {renderSection("Teachers", result?.teacherMatches ?? [])}
          {renderSection("Students", result?.studentMatches ?? [])}
        </>
      )}
    </div>
  );
};

export default FilterData;
