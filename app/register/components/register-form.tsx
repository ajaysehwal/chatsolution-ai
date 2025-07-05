"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "../../../components/AppComponents/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleAuth, Register, ManageCookies } from "../../../services";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignUp({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [name, setname] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [toggle, settoggle] = React.useState<boolean>(false);
  const Registertion = new Register();
  const cookies = new ManageCookies();

  async function onSubmit(event: React.SyntheticEvent) {
    setIsLoading(true);
    event.preventDefault();
    const isValid = await Registertion.validateRegistration(
      name,
      email,
      password,
      confirmPassword
    );

    if (isValid.status) {
      const registered = await Registertion.register(email, password, name);
      settoggle(true);
      cookies.setcookie("Secure_S_UID_", registered.data.user.id);
    } else {
      const error = isValid.response;
      toast({
        variant: "destructive",
        title: error,
      });
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <>
      <Toaster />
      {toggle ? (
        <div className="text-center p-6 bg-green-50 rounded-lg">
          <svg
            className="w-12 h-12 text-green-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Registration Successful!
          </h3>
          <p className="text-green-700">
            Please check your email to confirm your account.{" "}
            <a
              className="text-blue-600 font-medium hover:text-blue-500 transition-colors"
              href="https://mail.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Gmail
            </a>
          </p>
        </div>
      ) : (
        <div className={cn("space-y-6", className)} {...props}>
          <form onSubmit={onSubmit}>
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  placeholder="John Doe"
                  type="text"
                  className="mt-1"
                  autoCapitalize="none"
                  autoComplete="name"
                  autoCorrect="off"
                  onChange={(e) => setname(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  value={email}
                  placeholder="name@example.com"
                  type="email"
                  className="mt-1"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <Input
                  value={password}
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  className="mt-1"
                  autoCapitalize="none"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  value={confirmPassword}
                  placeholder="••••••••"
                  type="password"
                  className="mt-1"
                  autoCapitalize="none"
                  autoComplete="new-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Create Account
              </Button>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            type="button"
            className="w-full"
            onClick={() => {
              /* Add Google Auth handler */
            }}
          >
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
      )}
    </>
  );
}
