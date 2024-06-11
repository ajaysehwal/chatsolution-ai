import { supabase } from '../app/libs/supabase';
export class Register {
  private emailPattern: RegExp;
  
  constructor() {
    this.emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  }

  private validatePassword(
    password: string,
    confirmPassword: string
  ): string | null {
    if (password !== confirmPassword) {
      return "Both passwords do not match";
    }
    if (password.length < 8) {
      return "Password should be at least 8 characters long";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password should contain at least one uppercase letter";
    }

    if (!/[a-z]/.test(password)) {
      return "Password should contain at least one lowercase letter";
    }

    if (!/\d/.test(password)) {
      return "Password should contain at least one digit";
    }

    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
      return "Password should contain at least one special character";
    }

    return null;
  }

  private validateEmail(email: string): string | null {
    if(email===''){
      return "please enter your email";
    }
    if (!this.emailPattern.test(email)) {
      return "Email is not valid";
    }

    return null;
  }
  public validate_name(name:string):string | null{
    if(name===""){
      return "Please enter your name";
    }
    return null;
  }

  async validateRegistration(
    fullname:string,
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<{ status: boolean; response: string }> {
    const passwordError = this.validatePassword(password, confirmPassword);
    const emailError = this.validateEmail(email);
    const nameError=this.validate_name(fullname);
    if (passwordError || emailError || nameError) {
      return { status: false, response: passwordError || emailError || "" };
    }
     return { status: true, response: "Registration is valid." };
   }
   async register(email: string, password:string, fullname:string): Promise<{ data: any; error: any }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
          data: {
            full_name:fullname,
          }
        }
      });
      return { data, error };
    } catch (error) {
      console.error('Error during registration:', error);
      return { data: null, error };
    }
  }
}