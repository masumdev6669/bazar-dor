"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { getBanglaDate } from "@/lib/bn";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [today, setToday] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setToday(getBanglaDate());
    const interval = setInterval(() => setToday(getBanglaDate()), 60_000);
    return () => clearInterval(interval);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  async function handleSignOut() {
    setMenuOpen(false);
    await signOut();
    toast.success("সফলভাবে লগআউট হয়েছেন");
    router.push("/");
    router.refresh();
  }

  const user = session?.user;
  const initial = (user?.name ?? user?.email ?? "?").charAt(0).toUpperCase();

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-green-600 text-white rounded-lg w-12 h-12 flex items-center justify-center text-2xl">
            🛒
          </div>
          <div className="leading-tight">
            <p className="font-bold text-green-700 text-xl">বাজার দর</p>
            <p className="text-xs text-gray-500">{today || "\u00A0"}</p>
          </div>
        </Link>

        {/* Auth area */}
        {isPending ? (
          <div className="h-9 w-40 bg-gray-200 rounded-md animate-pulse" />
        ) : user ? (
          <div className="relative" ref={menuRef}>
            {/* Trigger button */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-green-700 transition"
            >
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name ?? "avatar"}
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold">
                  {initial}
                </div>
              )}
              <span className="hidden sm:inline">
                {user.name ?? user.email}
              </span>
              <span className="text-gray-400 text-xs">▾</span>
            </button>

            {/* Dropdown */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                {/* User info */}
                <div className="p-4 flex items-center gap-3 border-b border-gray-100">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name ?? "avatar"}
                      width={44}
                      height={44}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold">
                      {initial}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {user.name ?? "নাম নেই"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Menu items */}
                <div className="p-2">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    <span className="text-gray-500">👤</span>
                    আমার প্রোফাইল
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    <span>↩</span>
                    সাইন আউট
                  </button>
                </div>
              </div>
            )}
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
