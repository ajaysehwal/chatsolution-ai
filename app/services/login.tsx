export class Login {
  private emailPattern: RegExp;
  constructor() {
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
  protected validatePassword(password: string): string | null {
    if (password === "") {
      return "Please enter a password";
    }
    return null;
  }
  async loginValid(
    email: string,
    password: string
  ): Promise<{ status: boolean; response: string }> {
    try {
      const emailError = this.emailValid(email);
      const passwordError = this.validatePassword(password);

      if (emailError !== null || passwordError !== null) {
        return {
          status: false,
          response: "Please Enter Valid Email and Password",
        };
      }
      return { status: true, response: "Validation completed..." };
    } catch (error) {
      console.log("Error during login:", error);
      return {
        status: false,
        response: "Login failed. Please try again later.",
      };
    }
  }
}
