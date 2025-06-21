"use client";

import React, { useState } from "react";
import { useGetAllTeachersQuery } from "@/redux/features/userManagement/userMamagement.api";
import ProfileCard from "@/components/common/ProfileCard";
import { Button } from "@/components/ui/button";
import { TQueryParam } from "@/types/global";
import SearchBar from "@/components/common/Searchbar";
import { teacherSearchableFields } from "@/constant/searchableFields";

const TeachersDataPage = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data: teachersData, isLoading, isFetching } = useGetAllTeachersQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const teachers = teachersData?.data || [];
  const total = teachersData?.meta?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 space-y-6 ">
           <SearchBar
        searchableFields={teacherSearchableFields}
        onSearch={(filters) =>
          setParams(
            Object.entries(filters).map(([name, value]) => ({ name, value }))
          )
        }
      />
      {isLoading ? (
        <p className="text-center py-10 text-lg">Loading teachers...</p>
      ) : (
        <>
          <div className="grid mx-auto p-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.length > 0 ? (
              teachers.map((teacher: any) => (
                <ProfileCard
                 userType="teachers"
                  key={teacher._id}
                  id={teacher._id}
                  name={teacher.name}
                  email={teacher.email}
                  profileImg={teacher.profileImg}
                  university={teacher.bsc || "N/A"}
                  skills={teacher.skill || []}
                  city={teacher.address?.city || "N/A"}
                  presentAddress={teacher.address?.presentAddress || "N/A"}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">No teachers found.</p>
            )}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1 || isFetching}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
            <Button
              variant="outline"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page >= totalPages || isFetching}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default TeachersDataPage;
