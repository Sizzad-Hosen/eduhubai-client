"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch: (filters: Record<string, string>) => void;
  searchableFields: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, searchableFields }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const filtered = Object.fromEntries(
      Object.entries(formData).filter(([_, v]) => v.trim() !== "")
    );
    onSearch(filtered);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl p-2 sm:p-3 font-extrabold bg-clip-text text-gray-900"
      >
        <span className="text-cyan-500">Advanced</span> Search and{" "}
        <span className="text-cyan-500">Filtering</span> Your Target Audience
      </motion.h1>

      <Card className="p-4 sm:p-6 mx-auto w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl mb-6 sm:mb-8 border border-gray-200 shadow-lg bg-gradient-to-br from-blue-100 via-white to-purple-100">
        <CardContent className="space-y-4 sm:space-y-6">
          <ScrollArea className="w-full max-h-[280px] sm:max-h-[280px] md:max-h-[320px] lg:max-h-[360px] xl:max-h-[400px] rounded-md border border-gray-300 bg-white/70 backdrop-blur-md shadow-inner">
        
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-3 py-3 sm:px-4 sm:py-4">
              
              {searchableFields.map((field) => (
                <motion.div
                  key={field}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className="min-w-0"
                >
                  <Input
                    name={field}
                    placeholder={`Search by ${field}`}
                    value={formData[field] || ""}
                    onChange={handleChange}
                    className="w-full text-xs placeholder:text-[8px] lg:placeholder:text-[16px] md:placeholder:text-[14px] text sm:text-sm md:text-base border border-gray-300 focus:ring-2 focus:ring-purple-500 transition"
                    inputMode="search"
                    autoComplete="off"
                  />
                </motion.div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex justify-end">
            <Button
              onClick={handleSearch}
              className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg shadow-lg transition"
            >
              🔍 Search
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SearchBar;