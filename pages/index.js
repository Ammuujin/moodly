import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link"; // Import the Link component

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
     <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-2xl sm:text-3xl font-bold">
        Welcome to Moodly
      </div>
      <div className="flex gap-4 items-center flex-col sm:flex-row mt-8">
        <Link href="/login" className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44">
          Login
        </Link>
        <Link href="/signup" className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44">
          Signup
        </Link>
      </div>
    </main><main className="flex min-h-screen flex-col items-center justify-center">
  <div className="text-2xl sm:text-3xl font-bold">
    Welcome to Moodly
  </div>

  <div className="mt-8 flex gap-4 items-center flex-col sm:flex-row">
    <Link href="/login" className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44">
      Login
    </Link>
    <Link href="/signup" className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44">
      Signup
    </Link>
  </div>
</main>


      {/* ... other content ... */}
    </div>
  );
}
