"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { SignUp } from "./components";
export default function AuthenticationPage() {
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
             Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              
            Enter your email and password below to create your account
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
             <SignUp />
          </motion.div>

          <p className="px-8 text-center text-sm text-muted-foreground">
             Already have account ?
          
              <Link
                href="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                login
              </Link>
            
          </p>
        </motion.div>
      </div>
    </>
  );
}
