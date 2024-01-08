"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "../../components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleAuth } from "../../services";
import { Register } from "../../services";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { ManageCookies } from "@/app/libs";

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
  const cookies=new ManageCookies();
async function onSubmit(event: React.SyntheticEvent) {
    setIsLoading(true);
    event.preventDefault();
    const isValid = await Registertion.validateRegistration(
      name,
      email,
      password,
      confirmPassword
    );
    console.log(isValid);

    if (isValid.status) {
      const registered = await Registertion.register(email, password, name);
      settoggle(true);
      cookies.setcookie("Secure_S_UID_",registered.data.user.id)
      console.log(registered.data.user);
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
        <p className="text-gray-700 font-semibold">
          Please Check your email for confirmation{" "}
          <a className="text-blue-700 underline hover:underline-none" href="https://mail.google.com">Click here</a>{" "}
        </p>
      ) : (
        <div className={cn("grid gap-6", className)} {...props}>
          <form className="w-[80%] m-auto" onSubmit={onSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1"> 
                <Label className="sr-only" htmlFor="email">
                  full name
                </Label>

                <Input
                  id="name"
                  value={name}
                  placeholder="full name"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="name"
                  autoCorrect="off"
                  onChange={(e) => setname(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>

                <Input
                  id="email"
                  value={email}
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Password
                </Label>
                <Input
                  value={password}
                  id="password"
                  placeholder="*******"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect="off"
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Confirm Password
                </Label>
                <Input
                  id="password"
                  value={confirmPassword}
                  placeholder="confirm password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect="off"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <Button disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign Up with Email
              </Button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <GoogleAuth />
        </div>
      )}
    </>
  );
}
