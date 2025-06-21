// components/ProtectedRoute.tsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useGetMEQuery } from "@/redux/features/userManagement/userMamagement.api";
import GlobalLoader from "./common/GlobalLoader";

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[]; // e.g., ['admin']
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading, isError } = useGetMEQuery({});

  useEffect(() => {
    if (!isLoading) {
      if (!user || isError) {
        // User not logged in → redirect to /register
        router.replace("/login");
      } else if (
        allowedRoles &&
        !allowedRoles.includes(
          // Adjust this line to use the correct property for role
          (user as any)?.role // Replace 'role' with the correct property if needed, e.g., user?.userType
        )
      ) {
        // Role mismatch → redirect to unauthorized page
        router.replace("/unauthorized");
      }
    }
  }, [user, isLoading, isError, pathname]);

  if (isLoading || !user) return <GlobalLoader></GlobalLoader>

  return <>{children}</>;
}
