"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignIn } from "./components";
import { motion } from "framer-motion";
import { useAuth } from "../hooks";
import Authloading from "../components/authloading";

export default function Login() {
   const { authState, authload,logOut }: { authState: boolean; authload: boolean,logOut:any } =
    useAuth();
  if (authload) {
    return <Authloading />;
  }
  if (authState) {
    return (
      <div
        className="relative h-[100vh] m-auto flex sm:block place-items-center items-center justify-center md:grid lg:max-w-none lg:px-0"
        style={{
          background:
            "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
        }}
      >
        <motion.div
          initial={{ scale: 0, y: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 2,
            ease: "backInOut",
            times: [0, 0.25, 0.5, 0.85, 1],
          }}
          exit={{
            scale: 0,
            y: 0,
          }}
          className="mx-auto w-full  justify-center place-items-center items-center space-y-6  py-7 px-10 rounded-xl"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
          }}
        >
          <h1 className="mb-4 text-xl font-bold text-gray-700 dark:text-gray-300">
            You're already logged in
          </h1>
          <Button
            onClick={() => logOut()}
            className="w-full bg-red-600 text-white hover:bg-transparent hover:text-red-500 border-red-500 font-semibold"
          >
            Log out
          </Button>
        </motion.div>
      </div>
    );
  }
  return (
    <>
      <div
        className="relative h-[100vh] m-auto flex sm:block place-items-center items-center justify-center md:grid lg:max-w-none lg:px-0"
        style={{
          background:
            "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
        }}
      >
        <motion.div
          initial={{ scale: 0, y: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 2,
            ease: "backInOut",
            times: [0, 0.25, 0.5, 0.85, 1],
          }}
          exit={{
            scale: 0,
            y: 0,
          }}
          className="mx-auto w-full  justify-center place-items-center items-center space-y-6  py-7 px-10 rounded-xl"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
          }}
        >
          <div className="space-y-2 text-center ">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back!
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password below to login your account
            </p>
          </div>

          <motion.div
            initial={{ scale: 0, y: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.85, 1],
            }}
            exit={{
              scale: 0,
              y: 0,
            }}
          >
            <SignIn />
          </motion.div>

          <p className="px-8 text-center text-sm text-muted-foreground">
            {"Don't have an account?"}

            <Link
              href="/register"
              className="underline underline-offset-4 hover:text-primary"
            >
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
}
