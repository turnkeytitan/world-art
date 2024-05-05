"use client";
import ListFav from "@/components/ui/ListFav";
import { useEffect } from "react";

function Favs() {
  useEffect(() => {
    if (!localStorage.getItem("userid")) {
      window.location.href = "/login";
    }
  }, []);
  return <ListFav />;
}
export default Favs;
