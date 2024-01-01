import { useRouter } from "next/navigation";
import { supabase } from "./supabase";
export class Login {
  router = useRouter();
  private failedLoginAttempts: number;
  private lastFailedLoginTimestamp: number;
  private MAX_LOGIN_ATTEMPTS = 5;
  private LOCK_DURATION = 60 * 60 * 1000;
  private emailPattern: RegExp;

  constructor() {
    this.failedLoginAttempts = 0;
    this.lastFailedLoginTimestamp = 0;
    this.emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  }

  protected emailValid(email: string): string | null {
    if (email === "") {
      return "Please enter your email";
    }
    if (!this.emailPattern.test(email)) {
      return "Email is not valid";
    }

    return null;
  }
  private validatepassword(password: string) {
    if (password === "") {
      return "Please enter a password";
    }
  }

  async loginUser(
    email: string,
    password: string
  ): Promise<{ user: any; error: any }> {
    try {
      if (this.failedLoginAttempts >= this.MAX_LOGIN_ATTEMPTS) {
        const elapsedTime = Date.now() - this.lastFailedLoginTimestamp;
        if (elapsedTime < this.LOCK_DURATION) {
          throw new Error(
            `Account locked. Please try again after ${Math.ceil(
              (this.LOCK_DURATION - elapsedTime) / 60000
            )} minutes.`
          );
        } else {
          this.failedLoginAttempts = 0;
          this.lastFailedLoginTimestamp = 0;
        }
      }
      const passwordError = this.validatepassword(password);
      const EmailError = this.emailValid(email);

      if (EmailError && passwordError) {
        return { user: null, error: "Please Enter Valid Email and Password" };
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        this.router.push('/',{scroll:false})
        this.failedLoginAttempts = 0;
        this.lastFailedLoginTimestamp = 0;
        return { user: data, error: error };
      }
    } catch (error) {
      console.error("Error during login:", error);
      return { user: null, error: error || "Login failed" };
    }
  }
}
