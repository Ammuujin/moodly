import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Signup() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Signup failed');
                return;
            }

            router.push('/login');
        } catch (error) {
            setError('An error occurred during signup.');
            console.error("Signup error:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')" }}>
            <Link href="/" className="absolute top-8 left-8 text-white text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </Link>

            <div className="bg-black bg-opacity-70 p-8 rounded-2xl shadow-md w-full max-w-md z-10 space-y-4">
                <h1 className="text-3xl font-bold text-white text-center mb-4">Welcome to Moodly</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white bg-opacity-70 text-white focus:outline-none focus:border-green-500 placeholder-gray-500"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white bg-opacity-70 text-white focus:outline-none focus:border-green-500 placeholder-gray-500"
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white bg-opacity-70 text-white focus:outline-none focus:border-green-500 placeholder-gray-500"
                        />
                    </div>

                    {error && <div className="text-red-500 text-center">{error}</div>}
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline">Sign Up</button>
                </form>
            </div>
        </div>
    );
}
