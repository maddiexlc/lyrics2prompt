/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/2ifrCcRGERX
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Component() {
  return (
    <div className="h-screen w-full flex flex-col bg-[#0f0c29] text-white">
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
          <span className="text-2xl font-bold">ChatBot</span>
        </Link>
        <Button className="border-[#00f5a0] text-[#00f5a0]" variant="secondary">
          Log in with Google
        </Button>
      </header>
      <main className="flex-1 grid gap-4 p-4 md:gap-8 md:p-10 grid-cols-1 items-end">
        <div className="rounded-lg border border-[#00f5a0] p-4">
          <p className="text-lg">Bot: Hello, how can I help you today?</p>
        </div>
        <form className="flex gap-2">
          <Input
            className="flex-grow rounded-lg border border-[#00f5a0] p-2"
            placeholder="Type your message here..."
            type="text"
          />
          <Button className="border-[#00f5a0] text-[#00f5a0]" variant="secondary">
            Send
          </Button>
        </form>
      </main>
    </div>
  )
}
