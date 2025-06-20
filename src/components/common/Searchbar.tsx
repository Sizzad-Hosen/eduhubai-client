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
    >
       <motion.h1
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="text-center text-2xl md:text-3xl p-3 font-bold  bg-clip-text text-gray-900"
>

 <span className="text-cyan-500">Advanced</span>  Search and <span className="text-cyan-500"> Filtering </span>Your Target Audience
</motion.h1>
      <Card className="p-7 mx-auto max-w-7xl mb-6 border shadow-md bg-gradient-to-br from-blue-100 via-white to-purple-100">
        <CardContent className="space-y-4">
          <ScrollArea className="w-full max-h-[300px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {searchableFields.map((field) => (
                <motion.div
                  key={field}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Input
                    name={field}
                    placeholder={`Search by ${field}`}
                    value={formData[field] || ""}
                    onChange={handleChange}
                    className="bg-white/70 backdrop-blur-md border-gray-300 focus:ring-2 focus:ring-purple-500"
                  />
                </motion.div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex justify-end">
            <Button
              onClick={handleSearch}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition"
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
