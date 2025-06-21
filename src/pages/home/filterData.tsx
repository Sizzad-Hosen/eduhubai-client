"use client";

import React from "react";
import { useGetFilterWiseQuery, useGetMEQuery } from "@/redux/features/userManagement/userMamagement.api";
import ProfileCard from "@/components/common/ProfileCard";
import { motion } from "framer-motion";

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
      <div className="mb-10 mx-auto max-w-7xl ">
        <h2 className="text-2xl font-semibold text-cyan-700 mb-4">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user, index) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <ProfileCard
                userType={currentUser?.user?.role}
                city={user?.address?.city}
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
      </div>
    );
  };

  const result = matches?.data?.result;

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-cyan-50 to-white">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 mb-12">
        Discover People Who Match You
      </h1>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : isError ? (
        <p className="text-center text-red-500">Failed to load data.</p>
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
