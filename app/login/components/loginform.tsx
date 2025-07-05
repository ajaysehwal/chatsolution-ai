"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Icons } from "../../../components/AppComponents/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleAuth, Login, ManageCookies } from "../../../services";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { supabase } from "../../libs/supabase";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignIn({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const cookies = new ManageCookies();
  const CheckInputValidation = new Login();

  const handleSignIn = async () => {
    try {
      const res = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setEmail("");
      setPassword("");
      if (!res.data.session) {
        toast({
          variant: "destructive",
          title: res.error?.message,
        });
      } else {
        cookies.setcookie("Secure_S_UID_", res.data.user.id);
        return router.push("/", { scroll: false });
      }
    } catch (err) {
      throw new Error(JSON.stringify(err));
    }
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    
    const check = await CheckInputValidation.loginValid(email, password);
    if (check.status) {
      await handleSignIn();
    } else {
      toast({
        variant: "destructive",
        title: check.response,
      });
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <>
      <Toaster />
      <div className={cn("space-y-6", className)} {...props}>
        <form onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoCapitalize="none"
                autoComplete="current-password"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Sign in
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
          onClick={() => {/* Add Google Auth handler */}}
        >
          <Icons.google className="mr-2 h-4 w-4" />
          Google
        </Button>
      </div>
    </>
  );
}
