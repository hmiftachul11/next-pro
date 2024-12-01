import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import ShimmerButton from "@/components/ui/shimmer-button";
import BoxReveal from "@/components/ui/box-reveal";

const HeroSection = () => {
  const [loading, setLoading] = useState(true); // Simulate loading state
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/activity?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // Simulate 1.5s load
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-blue-100 font-sans">
      <div
        className="mx-auto h-screen"
        style={{
          backgroundImage: "url(./hero.webp)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start justify-between h-full pt-16 lg:pt-32">
          {/* Skeleton Loading */}
          {loading ? (
            <div className="w-full lg:w-3/5 px-4 mt-16 sm:mt-24 lg:mt-32 bg-[#f0f4fa] bg-opacity-60 p-6 sm:p-8 rounded-xl animate-pulse">
              <div className="h-8 sm:h-10 lg:h-12 bg-gray-300 rounded-md mb-4"></div>
              <div className="h-6 sm:h-8 lg:h-10 bg-gray-300 rounded-md mb-6"></div>
              <div className="h-6 bg-gray-300 rounded-md w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-300 rounded-md w-1/2"></div>
              <div className="mt-6 w-full sm:w-44 lg:w-64 h-12 md:h-14 bg-gray-300 rounded-full"></div>
            </div>
          ) : (
            // Text Section
            <div className="w-full lg:w-3/5 px-4 mt-16 sm:mt-24 lg:mt-32 bg-[#e4f6ff] bg-opacity-60 p-6 sm:p-8 rounded-xl">
              <p
                className="text-3xl sm:text-4xl lg:text-5xl font-bold"
                style={{ lineHeight: "1.3" }}
              >
                Embark on Unforgettable Journeys with{" "}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4393F5] to-pink-600">
                  Trachel
                </span>
              </p>

              <p className="mt-4 text-lg sm:text-xl pb-6 font-medium text-gray-700">
                Your gateway to discovering the hidden gems of Southeast Asia
                and beyond. Let us guide you to experiences you&lsquo;ll cherish
                forever.
              </p>

              <Link href="/activity">
                <ShimmerButton className="bg-gradient-to-r from-[#4088EE] to-[#3D81E1] text-white font-semibold w-full sm:w-44 lg:w-64 h-12 md:h-14 text-sm md:text-lg rounded-full transition duration-300 ease-in-out hover:from-[#5C91E0] hover:to-[#2D69C1]">
                  Start Your Adventure
                </ShimmerButton>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
