"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <main className="min-h-screen px-6 py-12 bg-white dark:bg-gray-950">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
          About <span className="text-blue-600">EduHubAI</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Empowering <strong>Students</strong>, <strong>Researchers</strong>, and <strong>Teachers</strong> to connect, collaborate, and innovate through AI-driven educational solutions.
        </p>
        <Separator className="my-6" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-3xl mx-auto text-left space-y-6 text-gray-700 dark:text-gray-300"
      >
        <section>
          <h2 className="text-2xl font-semibold mb-2">🌟 Our Mission</h2>
          <p>
            EduHubAI is dedicated to building an ecosystem where knowledge flows freely across disciplines and borders.
            By combining the power of AI with intuitive design, we aim to break down barriers in education and research.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">💡 What We Offer</h2>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>AI-powered research workflow and collaboration tools</li>
            <li>Student and teacher profiles with expertise matching</li>
            <li>Advanced search for research topics, mentors, and resources</li>
            <li>Secure communication and project management features</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">🌍 Why It Matters</h2>
          <p>
            In a world where access to quality education and mentorship is often limited, EduHubAI opens doors by
            making connections meaningful and research more inclusive.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">🚀 Our Vision</h2>
          <p>
            To become the go-to platform for anyone involved in education and research — from students starting their
            journey to experts pushing the boundaries of knowledge.
          </p>
        </section>
      </motion.div>
    </main>
  );
};

export default About;
