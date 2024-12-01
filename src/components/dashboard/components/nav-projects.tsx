"use client";

import { type LucideIcon } from "lucide-react";
import Image from "next/image";

export function NavProjects({
  projects,
}: {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  return (
    <div className="w-full max-w-xs bg-white overflow-hidden">
      <div className="bg-gradient-to-r from-blue-100 to-blue-300 px-4 py-3 text-white">
        
      <Image
          src="/logo.webp"
          alt="Profile Preview"
          width={120}
          height={30}
          priority={true}
        />
      </div>
      <ul className="divide-y divide-gray-200">
        {projects.map((item) => (
          <li
            key={item.name}
            className="flex items-center gap-4 p-4 hover:bg-blue-50 transition duration-300"
          >
            <a
              href={item.url}
              className="flex items-center w-full gap-3 text-gray-700 hover:text-blue-600"
            >
              <item.icon className="w-6 h-6 text-blue-500" />
              <span className="font-medium">{item.name}</span>
            </a>
            <button
              className="text-gray-400 hover:text-blue-500 focus:outline-none"
              aria-label={`More options for ${item.name}`}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 12h12M6 12h12M6 12h12"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
