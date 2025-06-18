"use client";

import React, { useState } from "react";
import ProfileCard from "@/components/common/ProfileCard";
import { useGetAllResearchersQuery } from "@/redux/features/userManagement/userMamagement.api";
import { TQueryParam } from "@/types/global";
import { Button } from "@/components/ui/button";

const ResearchersDataPage = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data: researchersData, isLoading, isFetching } = useGetAllResearchersQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const researchers = researchersData?.data || [];
  const total = researchersData?.meta?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 space-y-6">
      {isLoading ? (
        <p className="text-center py-10 text-lg">Loading researchers...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchers.length > 0 ? (
              researchers.map((researcher: any) => (
                <ProfileCard
                  key={researcher._id}
                  id={researcher._id}
                  name={researcher.name}
                  email={researcher.email}
                  profileImg={researcher.profileImg}
                  university={researcher.university || "N/A"}
                  skills={researcher.skill || []}
                  city={researcher.address?.city || "N/A"}
                  presentAddress={researcher.address?.presentAddress || "N/A"}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">No researchers found.</p>
            )}
          </div>

          {/* Pagination Controls */}
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

export default ResearchersDataPage;
