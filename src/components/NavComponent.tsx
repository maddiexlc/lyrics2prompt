"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NavComponent() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div>
      <header className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link className="flex items-center gap-2" href="#">
          <svg
            className=" h-6 w-6 text-[#00f5a0]"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17 6.1H3" />
            <path d="M21 12.1H3" />
            <path d="M15.1 18H3" />
          </svg>
          <span className="text-2xl font-bold">ChatBox</span>
        </Link>
        {session ? (
          <Button
            className="border-[#00f5a0] text-[#00f5a0] flex items-center"
            variant="secondary"
            onClick={() => signOut()}
          >
            <span className="text-blue-500 mr-1">{user?.name}</span>
            <span className="text-red-500">Log out</span>{" "}
          </Button>
        ) : (
          <Button
            className="border-[#00f5a0] text-[#00f5a0]"
            variant="secondary"
            onClick={() => signIn()}
          >
            Log in with Google
          </Button>
        )}
      </header>
    </div>
  );
}
