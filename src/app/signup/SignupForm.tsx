"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn, signUp } from "@/lib/auth-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

export default function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name")).trim();
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));
    const confirm = String(form.get("confirm"));

    if (!name || !email || !password) {
      toast.error("সব ঘর পূরণ করুন");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      setLoading(false);
      return;
    }

    if (password !== confirm) {
      toast.error("পাসওয়ার্ড মিলছে না");
      setLoading(false);
      return;
    }

    const { error } = await signUp.email({ name, email, password });

    if (error) {
      toast.error(error.message ?? "সাইন আপ ব্যর্থ হয়েছে");
      setLoading(false);
      return;
    }

    toast.success("সাইন আপ সফল হয়েছে");
    setLoading(false);
    router.push("/signin");
  }

  async function handleSocial(provider: "google" | "github") {
    setSocialLoading(provider);
    const { error } = await signIn.social({
      provider,
      callbackURL: "/",
    });
    if (error) {
      toast.error(error.message ?? "সোশ্যাল লগইন ব্যর্থ");
      setSocialLoading(null);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-sm text-gray-500">
          বিনা খরচে বাজার দাম দেখতে অ্যাকাউন্ট তৈরি করুন
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              নাম
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="যেমন: মোঃ মাহবুব আলম মামুন"
              className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              ইমেইল
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              পাসওয়ার্ড
            </label>
            <input
              name="password"
              type="password"
              required
              minLength={8}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              name="confirm"
              type="password"
              required
              minLength={8}
              placeholder="আবার লিখুন"
              className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading || socialLoading !== null}
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-md transition disabled:opacity-60"
          >
            {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">অথবা</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            disabled={socialLoading !== null || loading}
            onClick={() => handleSocial("google")}
            className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 rounded-md py-2.5 text-sm font-medium text-gray-700 transition disabled:opacity-60"
          >
            <FontAwesomeIcon
              icon={faGoogle}
              className="text-lg text-[#DB4437]"
            />

            {socialLoading === "google"
              ? "অপেক্ষা..."
              : "Google দিয়ে চালিয়ে যান"}
          </button>
          <button
            type="button"
            disabled={socialLoading !== null || loading}
            onClick={() => handleSocial("github")}
            className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 rounded-md py-2.5 text-sm font-medium text-gray-700 transition disabled:opacity-60"
          >
            <FontAwesomeIcon icon={faGithub} className="text-lg" />

            {socialLoading === "github"
              ? "অপেক্ষা..."
              : "GitHub দিয়ে চালিয়ে যান"}
          </button>
        </div>
      </div>

      <p className="text-center text-sm text-gray-600 mt-6">
        অ্যাকাউন্ট আছে?{" "}
        <Link
          href="/signin"
          className="text-green-700 font-medium hover:underline"
        >
          সাইন ইন করুন
        </Link>
      </p>

      <p className="text-center text-sm text-gray-500 mt-3">
        <Link href="/" className="hover:text-green-700">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}
