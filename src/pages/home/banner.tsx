import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://www.shutterstock.com/image-photo/walking-happy-girl-friends-university-260nw-2477767447.jpg"
          alt="Banner Background"
          layout="fill"
          objectFit="cover"
          quality={90}
          className="opacity-60"
          priority
        />
      </div>

      {/* Overlay content */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 bg-black/40">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-white py-16">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Empowering Students, Teachers, and Researchers
            </h1>
            <p className="text-lg text-gray-200">
              Build your academic profile, collaborate on research, and connect with the academic community through our powerful platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
              </Button>
              <Button variant="outline" className="  hover:bg-white hover:text-black">
                Learn More
              </Button>
            </div>
          </div>

          {/* Optional Placeholder or Additional Content */}
          <div className="hidden md:block"></div>
        </div>
      </section>
    </main>
  );
};

export default Banner;
