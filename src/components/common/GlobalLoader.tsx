"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-4"
      >
        <Image
          src="https://i.postimg.cc/Qtw1MT39/logo-removebg-preview.png"
          alt="EduHubAI Loader"
          width={120}
          height={120}
          className="animate-pulse"
          priority
        />
        <p className="text-xl font-semibold text-cyan-700">EduHubAI is Loading...</p>
      </motion.div>
    </div>
  );
};

export default GlobalLoader;
