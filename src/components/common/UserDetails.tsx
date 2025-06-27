"use client";

import { Address, UserDetailsProps } from "@/types/userManagement.type";
import React from "react";
import { motion } from "framer-motion";
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  BookOpenIcon,
  MapPinIcon,
} from "lucide-react";
import { Button } from "../ui/button";

interface EnhancedUserDetailsProps extends UserDetailsProps {
  onConnect?: (id: string) => void;
}

const UserDetails = ({ data, onConnect }: EnhancedUserDetailsProps) => {
  const safeJoin = (arr?: string[], separator = ", ") =>
    arr?.length ? arr.join(separator) : "Not specified";

  const formatAddress = (address?: Address) => {
    if (!address) return "Not specified";
    const parts = [address.presentAddress, address.city, address.homeTown].filter(Boolean);
    return parts.length ? parts.join(", ") : "Not specified";
  };

  const fields = [
    { label: "Name", value: data.name, icon: <UserIcon className="w-4 h-4 text-blue-500" /> },
    { label: "Role", value: data.role },
    { label: "Email", value: data.email, icon: <MailIcon className="w-4 h-4 text-green-500" /> },
    { label: "Phone", value: data.phone, icon: <PhoneIcon className="w-4 h-4 text-amber-500" /> },
    { label: "Experience", value: data.experience },
    { label: "Expertise", value: data.expertise },
    { label: "Skills", value: safeJoin(data.skills) },
    { label: "Currently Working At", value: data.currentlyWorkingAt },
    { label: "BSc", value: data.bsc },
    { label: "MSc", value: data.msc },
    { label: "PhD", value: data.phd },
    { label: "Academic Interests", value: safeJoin(data.academicInterests) },
    { label: "Bio", value: data.bio },
    { label: "Research Area", value: data.researchArea },
    {
      label: "Research Paper",
      value: data.researchPaper?.title || "Not specified",
      icon: <BookOpenIcon className="w-4 h-4 text-purple-500" />,
    },
    {
      label: "Address",
      value: formatAddress(data.address),
      icon: <MapPinIcon className="w-4 h-4 text-red-500" />,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative max-w-5xl mx-auto rounded-3xl shadow-2xl overflow-hidden px-6 md:px-10 py-10 md:py-14"
    >
      {/* Soft pastel green-teal-cyan gradient background */}
      <div
        className="
          absolute inset-0 
          bg-gradient-to-tr 
          from-green-50 
          via-teal-50 
          to-cyan-50 
          dark:from-green-900/30 
          dark:via-teal-900/30 
          dark:to-cyan-900/30 
          rounded-3xl
          z-0
          blur-md
        "
      />

      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl z-0 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-inner" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-600 text-transparent bg-clip-text tracking-tight">
            {data.name}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
            {data.role} Profile
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {fields.map(({ label, value, icon }, i) =>
            value && value !== "Not specified" ? (
              <motion.div
                key={label}
                className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  {icon}
                  <span className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 tracking-wide">
                    {label}
                  </span>
                </div>
                <p className="text-base font-medium text-gray-800 dark:text-gray-100 break-words">
                  {value}
                </p>
              </motion.div>
            ) : null
          )}
        </div>

        {/* Connect Button */}
        {onConnect && data._id && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Button
              variant="default"
              onClick={() => onConnect(data._id)}
              className="px-8 py-3 rounded-full text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
            >
              Connect
            </Button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default UserDetails;
