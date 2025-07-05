"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { SignIn } from "./components";
import Image from "next/image";

export default function AuthenticationPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Image/Brand section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-purple-700 to-blue-600">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
            <p className="text-xl mb-8">
              Continue your journey with ChatSolution AI
            </p>
            <div className="w-3/4 mx-auto">
              <Image
                src="/logo.png"
                alt="ChatSolution AI"
                width={400}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Sign in form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
              <p className="mt-2 text-gray-600">
                Access your ChatSolution AI account
              </p>
            </div>

            <SignIn />

            <div className="mt-6 text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                Create one
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
