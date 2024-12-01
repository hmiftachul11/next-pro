import ImageLoginRegis from "@/components/content/imageLoginRegis";
import LogoOptionLogin from "@/components/content/logoOptionLogin";
import OrDevider from "@/components/content/orDevider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UseRegister from "@/hooks/useRegister";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RegisterPage = () => {
  const { success, error, isLoading, handleRegister } = UseRegister();

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        {/* Left Image Section */}
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1660663577778-c45295fc2dec?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="lg:text-5xl font-bold text-white sm:text-3xl">Trachel</h2>
              <p className="max-w-3xl text-xl mt-3 text-gray-300">
                Discover amazing destinations, plan your trips, and explore the world with ease using Trachel.
              </p>
            </div>
          </div>
        </div>

        {/* Right Registration Form Section */}
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
              <Image
                      src="/logo.webp"
                      alt="Logo"
                      width={160}
                      height={30}
                      priority
                    />
              </div>
              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Join Trachel and embark on your next adventure!
              </p>
            </div>

            <div className="mt-8">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert className="mb-4">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>Registration successful</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleRegister}>
                <div>
                  <Label htmlFor="name" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    required
                    className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700"
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700"
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="password" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700"
                  />
                </div>
                <div className="mt-4">
                  <Label
                    htmlFor="passwordRepeat"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Repeat Password
                  </Label>
                  <Input
                    id="passwordRepeat"
                    name="passwordRepeat"
                    type="password"
                    placeholder="Confirm your password"
                    required
                    className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700"
                  />
                </div>

                <Button
                  className="mt-6 w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Register"}
                </Button>
              </form>

              <p className="mt-6 text-sm text-center text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-500 focus:underline hover:underline">
                  Log in
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
