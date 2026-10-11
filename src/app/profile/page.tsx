"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import Navbar from "../_components/Navbar";
import CategoryTabs from "../_components/CategoryTabs";
import Marquee from "../_components/Marquee";
import Footer from "../_components/Footer";
import { useSession, signOut, updateUser } from "@/lib/auth-client";
import {
  getCategories,
  getProducts,
  type Category,
  type Product,
} from "@/lib/api";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  // Load nav data once
  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
    getProducts()
      .then(setProducts)
      .catch(() => {});
  }, []);

  // Sync name when session loads
  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
  }, [session?.user?.name]);

  // Redirect if not logged in
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/signin?redirect=/profile");
    }
  }, [isPending, session, router]);

  async function handleSignOut() {
    await signOut();
    toast.success("সফলভাবে লগআউট হয়েছেন");
    router.push("/");
    router.refresh();
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }
    if (trimmed === session?.user?.name) {
      toast("নাম আগের মতোই আছে");
      return;
    }

    setSaving(true);
    const { error } = await updateUser({ name: trimmed });
    setSaving(false);

    if (error) {
      toast.error(error.message ?? "আপডেট ব্যর্থ হয়েছে");
      return;
    }
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.refresh();
  }

  // Loading skeleton
  if (isPending || !session?.user) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mb-8" />
          <div className="h-28 bg-gray-200/60 rounded-2xl animate-pulse mb-6" />
          <div className="h-56 bg-gray-200/60 rounded-2xl animate-pulse" />
        </div>
        <Footer />
      </main>
    );
  }

  const user = session.user;
  const initial = (user.name ?? user.email ?? "?").charAt(0).toUpperCase();

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <CategoryTabs categories={categories} />
      {products.length > 0 && <Marquee items={products} />}

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            আমার প্রোফাইল
          </h1>
          <p className="text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
          </p>
        </div>

        {/* Account card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 min-w-0">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name ?? "avatar"}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xl font-bold">
                {initial}
              </div>
            )}
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 truncate">
                {user.name ?? "নাম নেই"}
              </p>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-red-300 text-red-600 hover:bg-red-50 text-sm font-medium transition shrink-0"
          >
            ↩ সাইন আউট
          </button>
        </div>

        {/* Update card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-6">তথ্য</h2>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                নাম
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-md transition disabled:opacity-60"
            >
              {saving ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}
