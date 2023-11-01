"use client";

import NavComponent from "@/components/NavComponent";
import UserInputComponent from "@/components/UserUI";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col bg-[#0f0c29] text-white">
      <SessionProvider>
        <NavComponent />
      </SessionProvider>
      <UserInputComponent />
    </div>
  );
}
