"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Amina Rahman",
    role: "Researcher",
    review: "Amazing platform! Helped me find collaboration opportunities across borders.",
    rating: 5,
  },
  {
    id: 2,
    name: "Tariq Islam",
    role: "Student",
    review: "I gained insights and mentorship from experienced teachers through EduHubAI.",
    rating: 4,
  },
  {
    id: 3,
    name: "Dr. Nadia Karim",
    role: "Professor",
    review: "Great tool for engaging students and researchers efficiently.",
    rating: 5,
  },
];

export default function ReviewPage() {
  return (
    <section
      className="
        py-16 px-6 md:px-20
        bg-gradient-to-tr from-slate-600 via-gray-200 to-slate-800 
        dark:from-blue-900 dark:via-blue-800 dark:to-blue-900
     
        flex flex-col items-center
      "
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-gray-900 dark:text-white relative">
        What Our Users Say
        <span className="absolute left-1/2 bottom-0 -translate-x-1/2 w-32 h-1 rounded-full
          bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
        />
      </h2>

      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3, duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 30px rgba(0,0,0,0.12)" }}
            className="cursor-pointer"
          >
            <Card
              className="
                rounded-3xl
                shadow-lg
                transition-shadow duration-300
                dark:bg-gray-800
                bg-white
                flex flex-col h-full
              "
            >
              <CardContent className="p-8 flex flex-col h-full">
                <div className="mb-4 flex items-center gap-3 text-yellow-400">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 fill-yellow-400 transition-all duration-300 group-hover:fill-yellow-500"
                      strokeWidth={1}
                    />
                  ))}
                </div>
                <p className="flex-grow text-lg text-gray-800 dark:text-gray-300 italic leading-relaxed mb-6">
                  “{review.review}”
                </p>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {review.name}
                </h4>
                <span className="text-md text-gray-600 dark:text-gray-400">
                  {review.role}
                </span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
