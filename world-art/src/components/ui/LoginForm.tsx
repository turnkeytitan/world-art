"use client";
import { login } from "@/lib/data";
import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    const response = await login({ username, email, password });
console.log(response);

    if (response.success) {
      localStorage.setItem("userid", response.data.id!);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("username", response.data.username);
      window.location.href = "/";
    }
  };
  return (
    <form className="h-full flex justify-center flex-col items-center gap-8 max-w-96">
      <Input
        type="username"
        name="username"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <Input
        type="email"
        name="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button
        type="button"
        onClick={() => {
          handleSubmit();
        }}>
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;
