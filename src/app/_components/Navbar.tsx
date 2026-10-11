"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getBanglaDate } from "@/lib/bn";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(getBanglaDate());
    const interval = setInterval(() => setToday(getBanglaDate()), 60_000);
    return () => clearInterval(interval);
  }, []);

  async function handleSignOut() {
    await signOut();
    toast.success("সফলভাবে লগআউট হয়েছেন");
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-green-600 text-white rounded-lg w-12 h-12 flex items-center justify-center text-2xl">
            🛒
          </div>
          <div className="leading-tight">
            <p className="font-bold text-green-700 text-xl">বাজার দর</p>
            <p className="text-xs text-gray-500">{today || "\u00A0"}</p>
          </div>
        </Link>

        {isPending ? (
          <div className="h-9 w-40 bg-gray-200 rounded-md animate-pulse" />
        ) : session?.user ? (
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className={`flex items-center gap-2 text-sm font-medium transition ${
                pathname === "/profile"
                  ? "text-green-700"
                  : "text-gray-700 hover:text-green-700"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">
                {(session.user.name ?? session.user.email ?? "?")
                  .charAt(0)
                  .toUpperCase()}
              </div>
              <span className="hidden sm:inline">
                {session.user.name ?? session.user.email}
              </span>
            </Link>
            <button
              onClick={handleSignOut}
              className="px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              সাইন আউট
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/signin"
              className="px-4 py-2 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-md transition"
            >
              সাইন ইন
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition"
            >
              সাইন আপ
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
