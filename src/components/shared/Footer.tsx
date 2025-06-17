import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Navigation Links */}
        <div className="flex gap-6 mb-4 md:mb-0">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/about" className="hover:text-white transition">About</Link>
          <Link href="/page" className="hover:text-white transition">Page</Link>
        </div>

        {/* Credits */}
        <p className="text-sm text-center md:text-right">
          Developed by <span className="text-white font-semibold">Commando Team</span> &nbsp;
          | &nbsp; Developer: <span className="text-white font-semibold">Sizzad Hosen</span>
        </p>
      </div>
    </footer>
  );
}
