import { createClient } from "@/prismicio";
import React from "react";
import NavBar from "@/components/NavBar";

export default async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return (
    <header className="top-0 z-50 w-full sticky">
      <NavBar settings={settings}/>
    </header>
  );
}