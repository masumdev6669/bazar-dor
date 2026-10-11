import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="text-center max-w-md">
        <p className="text-7xl font-bold text-red-700 mb-4">404</p>
        <h1 className="text-2xl font-bold text-red-600 mb-3">Page not found</h1>
        <p className="text-gray-500 mb-8">
          The page you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-block bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
