import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function TravelFooter() {
  return (
    <footer className="bg-[#5C9EF5] bg-opacity-40 border-t border-gray-200 py-6">
      <div className="max-w-screen-2xl mx-auto flex flex-wrap justify-between items-center px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center w-full sm:w-auto justify-center sm:justify-start mb-4 sm:mb-0">
          <Image src="/logo.webp" alt="Logo" width={170} height={40} />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6 w-full sm:w-auto mb-4 sm:mb-0">
          <Link href="/products" className="text-sm text-gray-700 hover:text-[#4393F5]">
            Products
          </Link>
          <Link href="/resources" className="text-sm text-gray-700 hover:text-[#4393F5]">
            Resources
          </Link>
          <Link href="/blogs" className="text-sm text-gray-700 hover:text-[#4393F5]">
            Blogs
          </Link>
          <Link href="/support" className="text-sm text-gray-700 hover:text-[#4393F5]">
            Support
          </Link>
        </div>

        {/* Contact Us Button */}
        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          <Button className="lg:w-[170px] sm:w-auto px-6 py-2 bg-gradient-to-r from-[#4088EE] to-[#3D81E1] text-white font-semibold transition duration-300 ease-in-out hover:from-[#5C91E0] hover:to-[#2D69C1]">
            Contact Us
          </Button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mt-6 pt-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Trachel. All rights reserved.{" "}
        <Link href="/terms" className="hover:underline">
          Terms
        </Link>{" "}
        |{" "}
        <Link href="/privacy" className="hover:underline">
          Privacy
        </Link>
      </div>
    </footer>

  );
}
