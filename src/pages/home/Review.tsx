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
    <section className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white">
        What Our Users Say
      </h2>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
          >
            <Card className="shadow-xl hover:shadow-2xl transition duration-300 rounded-2xl">
              <CardContent className="p-6">
                <div className="mb-2 flex items-center gap-2 text-yellow-500">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-4 italic">
                  “{review.review}”
                </p>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {review.name}
                </h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">{review.role}</span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
