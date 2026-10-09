import Image from "next/image";
import heroImg from "@/assets/bazar-hero.png";
import { getBanglaDate } from "@/lib/bn";

export default function Hero() {
  const today = getBanglaDate();

  return (
    <section className="max-w-6xl mx-auto px-4 mt-6 w-full">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            {today}
          </span>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-gray-600 mb-6 max-w-xl mx-auto md:mx-0 leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিশ্লেষিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <a
            href="#সব-পণ্য"
            className="inline-block bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-7 rounded-md transition shadow-sm"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        <div className="shrink-0 w-56 md:w-72 lg:w-80">
          <Image
            src={heroImg}
            alt="ফলের ঝুড়ি"
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}
