export default function Footer() {
  return (
    <footer className="mt-auto bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-600">
        <p>
          <span className="font-bold">বাজার দর</span> — প্রয়োজনীয় পণ্যের দাম
          এক নজরে।
        </p>
        <p className="text-gray-500">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
