import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { Icon } from "@iconify/react";

const FormContact = () => {
  return (
    <section
      className="min-h-screen bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      <div className="flex flex-col min-h-screen bg-black/60">
        <div className="container flex flex-col flex-1 px-6 py-12 mx-auto">
          <div className="flex-1 lg:flex lg:items-center lg:-mx-6">
            {/* Left Side Content */}
            <div className="text-white lg:w-1/2 lg:mx-6">
              <h1 className="text-2xl font-semibold capitalize lg:text-5xl">
                Discover the world with Trachel
              </h1>
              <p className="max-w-3xl text-xl mt-6">
                Embark on unforgettable journeys with Trachel, your ultimate travel
                companion. Explore breathtaking destinations, uncover hidden gems, and
                create memories that last a lifetime.
              </p>
              <button className="px-8 py-3 mt-6 text-md font-semibold tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#4393F5] rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50">
                Get started with Trachel
              </button>
              <div className="mt-6 md:mt-8">
                <h3 className="text-gray-300">Connect with us</h3>
                <div className="flex mt-4 space-x-4">
                  {/* Instagram */}
                  <a
                    href="#"
                    className="text-white transition-colors hover:text-blue-500"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-8 h-8"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.333-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.634 2.163 15.254 2.163 12s.012-3.584.07-4.85c.062-1.366.333-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.332.015 7.052.072 5.77.128 4.688.374 3.769.926 2.85 1.478 2.063 2.265 1.511 3.184.96 4.104.713 5.186.657 6.468.6 7.748.585 8.158.585 12c0 3.842.015 4.252.072 5.532.057 1.281.303 2.364.854 3.283.552.92 1.34 1.706 2.258 2.258.92.552 2.002.797 3.283.854 1.28.057 1.69.072 5.532.072s4.252-.015 5.532-.072c1.281-.057 2.364-.303 3.283-.854.92-.552 1.706-1.34 2.258-2.258.552-.92.797-2.002.854-3.283.057-1.28.072-1.69.072-5.532 0-3.842-.015-4.252-.072-5.532-.057-1.281-.303-2.364-.854-3.283-.552-.92-1.34-1.706-2.258-2.258C16.284.374 15.201.128 13.92.072 12.639.015 12.229 0 12 0zm0 5.838a6.162 6.162 0 1 0 6.162 6.162A6.162 6.162 0 0 0 12 5.838zm0 10.062a3.9 3.9 0 1 1 3.9-3.9 3.9 3.9 0 0 1-3.9 3.9zm6.406-11.845a1.44 1.44 0 1 0 1.44-1.44 1.44 1.44 0 0 0-1.44 1.44z" />
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a
                    href="#"
                    className="text-white transition-colors hover:text-blue-500"
                    aria-label="LinkedIn"
                  >
                    <svg
                      className="w-8 h-8"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 20h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.78-1.75-1.73 0-.96.78-1.73 1.75-1.73s1.75.78 1.75 1.73c0 .95-.78 1.73-1.75 1.73zm13.5 12.27h-3v-5.5c0-1.38-.04-3.17-1.93-3.17-1.93 0-2.23 1.51-2.23 3.07v5.6h-3v-11h2.89v1.51h.04c.4-.75 1.37-1.54 2.81-1.54 3.01 0 3.57 1.99 3.57 4.58v6.45z" />
                    </svg>
                  </a>
                  {/* Facebook */}
                  <a
                    href="#"
                    className="text-white transition-colors hover:text-blue-500"
                    aria-label="Facebook"
                  >
                    <svg
                      className="w-8 h-8"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.676 0h-21.352c-.729 0-1.324.595-1.324 1.324v21.352c0 .729.595 1.324 1.324 1.324h11.477v-9.289h-3.123v-3.623h3.123v-2.671c0-3.1 1.893-4.788 4.656-4.788 1.325 0 2.464.098 2.793.143v3.239h-1.918c-1.506 0-1.798.716-1.798 1.766v2.311h3.596l-.468 3.623h-3.128v9.289h6.134c.729 0 1.324-.595 1.324-1.324v-21.352c0-.729-.595-1.324-1.324-1.324z" />
                    </svg>
                  </a>
                  {/* Threads */}
                  <a
                    href="#"
                    className="text-white transition-colors hover:text-blue-500"
                    aria-label="Threads"
                  >
                    <svg
                      className="w-8 h-8"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.646 12.057c-1.12 1.189-2.605 1.736-4.646 1.736-2.04 0-3.525-.547-4.646-1.736-1.053-1.119-1.59-2.473-1.59-4.057s.537-2.938 1.59-4.057c1.12-1.189 2.605-1.736 4.646-1.736 2.04 0 3.525.547 4.646 1.736 1.053 1.119 1.59 2.473 1.59 4.057s-.537 2.938-1.59 4.057z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            {/* Right Side Form */}
            <div className="mt-8 lg:w-1/2 lg:mx-6">
              <div className="w-full px-8 py-10 mx-auto overflow-hidden bg-white shadow-2xl rounded-xl dark:bg-gray-900 lg:max-w-xl">
                <h1 className="text-xl font-medium text-gray-700 dark:text-gray-200">
                  Contact Trachel
                </h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Have questions about your next adventure? We&apos;d love to hear from you.
                </p>
                <form className="mt-6">
                  <div className="flex-1">
                    <label
                      htmlFor="full-name"
                      className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                    >
                      Full Name
                    </label>
                    <input
                      id="full-name"
                      type="text"
                      placeholder="John Doe"
                      className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                  </div>
                  <div className="flex-1 mt-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                    >
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="johndoe@example.com"
                      className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                  </div>
                  <div className="w-full mt-6">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-48 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <button className="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#4393F5] rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50">
                    Send your message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default FormContact;
