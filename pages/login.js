import { useState } from "react";
import { useRouter } from "next/router";
import localFont from 'next/font/local';

const geistVF = localFont({
  src: [
    { path: './fonts/GeistVF.woff', weight: '400', style: 'normal' },
  ],
  variable: '--font-geist',
});

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    router.push('/feeling');
  };

  const [activeInput, setActiveInput] = useState(null);

  return (
    <div
      className={`${geistVF.className} flex items-center justify-center min-h-screen bg-cover bg-center`}
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className={`${geistVF.className} bg-black bg-opacity-60 p-8 rounded-2xl shadow-md w-full max-w-md`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white absolute top-4 left-4 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={() => router.back()}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Welcome to Moodly
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">          
          <label htmlFor="email" className="block text-white text-sm font-bold mb-1">Email</label>
          <input 
            type="email" 
            id="email" 
            className={`w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-60 p-4 rounded-2xl border ${activeInput === 'email' ? "border-green-500" : "border-gray-300"}`} 
            placeholder="Email" style={{ color: 'white' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setActiveInput('email')}
            onBlur={() => setActiveInput(null)} 
            required 
          />
          <label htmlFor="password" className="block text-white text-sm font-bold mb-1">Password</label>
          <input 
            type="password"
            id="password"
            className={`w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-60 p-4 rounded-2xl border ${activeInput === 'password' ? "border-green-500" : "border-gray-300"}`} 
            placeholder="Password" style={{ color: 'white' }}
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            onFocus={() => setActiveInput('password')}
            onBlur={() => setActiveInput(null)}
            required 
          />       
          {error && <div className="text-red-500 text-center">{error}</div>}
          <a href="/forgot-password" className="text-white text-center block text-sm hover:underline">
            Forgot Password?
          </a>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline">
            Login
          </button>
          <button type="button" onClick={() => router.push('/signup')} className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
