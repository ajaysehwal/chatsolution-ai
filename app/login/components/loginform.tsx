"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Icons } from "../../components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleAuth,Login,ManageCookies } from "../../services";
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
  const cookies=new ManageCookies();
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
        cookies.setcookie("Secure_S_UID_",res.data.user.id)
        return router.push("/", { scroll: false });
      }
    } catch (err) {
      throw new Error(JSON.stringify(err));
    }
  };
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const check = await CheckInputValidation.loginValid(email, password);
    if (check.status) {
      await handleSignIn();
    } else {
      setIsLoading(true);
      toast({
        variant: "destructive",
        title: check.response,
      });
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <>
      <Toaster />
      <div className={cn("grid gap-6", className)} {...props}>
        <form className="w-[80%] m-auto" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="name@example.com"
                type="email"
                value={email}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Password
              </Label>
              <Input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="*******"
                type="password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>

            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In with Email
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
{/*         <GoogleAuth /> */}
      </div>
    </>
  );
}
