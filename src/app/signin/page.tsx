import { Suspense } from "react";
import Navbar from "../_components/Navbar";
import CategoryTabs from "../_components/CategoryTabs";
import Marquee from "../_components/Marquee";
import Footer from "../_components/Footer";
import SigninForm from "./SigninForm";
import { getCategories, getProducts } from "@/lib/api";

export default async function SignInPage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <CategoryTabs categories={categories} />
      <Marquee items={products} />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Suspense
          fallback={
            <div className="w-full max-w-md h-96 bg-gray-200/50 rounded-2xl animate-pulse" />
          }
        >
          <SigninForm />
        </Suspense>
      </div>

      <Footer />
    </main>
  );
}
