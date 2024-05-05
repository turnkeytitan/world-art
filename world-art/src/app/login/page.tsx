'use client'
import LoginForm from "@/components/ui/LoginForm";
import { useEffect } from "react";

function Login() {
  useEffect(() => {
    if (!!localStorage.getItem("userid")) {
      window.location.href = "/";
    }
  }, []);
  return (
    <div className="h-full flex justify-center items-center flex-col gap-8">
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
}
export default Login;
