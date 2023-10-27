"use client";

import NavComponent from "@/components/NavComponent";
import UserInputComponent from "@/components/UserUI";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <div>
      <SessionProvider>
        <NavComponent />
      </SessionProvider>
      <UserInputComponent />
    </div>
  );
}
