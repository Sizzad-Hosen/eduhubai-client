"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import GlobalLoader from "@/components/common/GlobalLoader";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <GlobalLoader />;

  return (
    <main className="bg-gradient-to-br from-cyan-100 via-white to-gray-800 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 px-6 py-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight"
        >
          About <span className="text-cyan-600 dark:text-cyan-400">EduHubAI</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
        >
          Empowering <strong>Students</strong>, <strong>Researchers</strong>, and <strong>Teachers</strong> to connect,
          collaborate, and innovate through AI-driven educational solutions.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Separator className="mx-auto w-16 border-cyan-500 dark:border-cyan-400" />
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-3xl mx-auto mt-12 space-y-10"
      >
        {[
          {
            icon: "🌟",
            title: "Our Mission",
            content:
              "EduHubAI is dedicated to building an ecosystem where knowledge flows freely across disciplines and borders. By combining the power of AI with intuitive design, we aim to break down barriers in education and research.",
          },
          {
            icon: "💡",
            title: "What We Offer",
            content: (
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>AI-powered research workflow and collaboration tools</li>
                <li>Student and teacher profiles with expertise matching</li>
                <li>Advanced search for research topics, mentors, and resources</li>
                <li>Secure communication and project management features</li>
              </ul>
            ),
          },
          {
            icon: "🌍",
            title: "Why It Matters",
            content:
              "In a world where access to quality education and mentorship is often limited, EduHubAI opens doors by making connections meaningful and research more inclusive.",
          },
          {
            icon: "🚀",
            title: "Our Vision",
            content:
              "To become the go-to platform for anyone involved in education and research — from students starting their journey to experts pushing the boundaries of knowledge.",
          },
        ].map(({ icon, title, content }) => (
          <motion.section
            key={title}
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md border border-gray-200 dark:border-gray-700"
          >
            <h2 className="flex items-center gap-3 text-xl font-semibold text-cyan-700 dark:text-cyan-400 mb-3">
              <span className="text-2xl">{icon}</span> {title}
            </h2>
            <div className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">{content}</div>
          </motion.section>
        ))}
      </motion.div>
    </main>
  );
};

export default About;
