// export const BASE_API_URL = "http://localhost:9999/api";
export const BASE_API_URL =
  "http://ec2-3-86-138-22.compute-1.amazonaws.com:9999/api";

export const signText = {
  EN: {
    signUp: {
      header: "Sign Up",
      personalDetails: "Personal Details",
      FirstName: "First Name",
      LastName: "Last Name",
      Email: "Email",
      Password: "Password",
      RetypePassword: "Retype Password",
      haveAccount: "Have an account ?",
    },
    signIn: {
      header: "Sign In",
      Email: "Email",
      Password: "Password",
      signIn: "Sign In",
      forgotPassword: "Forgot password?",
      signUp: "Sign Up",
      signUpText: "Dont have an account ?",
    },
  },
  HE: {
    signUp: {
      header: "הרשמה",
      personalDetails: "פרטים אישיים",
      FirstName: "שם פרטי",
      LastName: "שם משפחה",
      Email: "אימייל",
      Password: "סיסמה",
      RetypePassword: "חזור על סיסמה",
      haveAccount: "יש לך משתמש ?",
    },
    signIn: {
      header: "התחברות",
      Email: "אימייל",
      Password: "סיסמה",
      signIn: "התחבר",
      forgotPassword: "שכחת סיסמה ?",
      signUp: "הירשם",
      signUpText: "אין לך משתמש ?",
    },
  },
};
