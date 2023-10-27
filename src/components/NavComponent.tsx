"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function NavComponent() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav className="bg-gray-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-blue-500 font-bold">
          <img src="/logo2.png" alt="Logo" className="h-8 w-auto" />
        </Link>
        <div>
          {session?(<button
            onClick={() => signOut()}
            className="text-white hover:underline"
          >
            Sign Out
          </button>):(<button
            onClick={() => signIn()}
            className="text-white hover:underline"
          >
            Sign in
          </button>)}
          
        </div>
      </div>
    </nav>
  );
}
