"use client";
import ListFav from "@/components/ui/ListFav";
import { useEffect } from "react";

function Favs() {
  let email;
  let username;
  useEffect(() => {
    if (!localStorage.getItem("userid")) {
      window.location.href = "/login";
    }

    email = localStorage.getItem("email");
    username = localStorage.getItem("username");
  }, []);
  return (
    <>
      <section className="flex flex-col gap-4 justify-center items-center mb-8">
        <h2 className="text-right text-xl font-extrabold">{username}</h2>
        <p>{email}</p>
      </section>
      <ListFav />
    </>
  );
}
export default Favs;
