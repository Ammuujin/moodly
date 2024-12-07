import { useState } from "react";
import { useRouter } from 'next/router';
import localFont from 'next/font/local';

const geistVF = localFont({
  src: [
    { path: './fonts/GeistVF.woff', weight: '400', style: 'normal' },
  ],
  variable: '--font-geist',
});

const moods = [
    "Happy", "Sad", "Angry", "Anxious", "Excited", "Tired", "Content", "Stressed",
    "Relaxed", "Frustrated", "Bored", "Peaceful", "Confused", "Optimistic",
    "Overwhelmed", "Lonely", "Grateful", "Curious", "Inspired", "Sick", "Loving",
    "Hurt", "Disgusted", "Ashamed", "Determined"
];

export default function Moodly() {
    const router = useRouter();
    const [feeling, setFeeling] = useState('');

    const handleMoodClick = (mood) => {
        router.push(`/main?mood=${mood}`);
    };

    return (
        <div
            className={`${geistVF.className} flex items-center justify-center min-h-screen bg-cover bg-center`}
            style={{ backgroundImage: "url('/background.jpg')" }}
        >
            <div className={`${geistVF.className} bg-black bg-opacity-60 p-8 rounded-2xl shadow-md w-full max-w-md`}>
                <h2 className="text-3xl font-bold text-center text-white mb-6">
                    How are you feeling today?
                </h2>
                <input 
                    type="text"
                    placeholder="Type your mood here..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white bg-opacity-70 text-white 
                       focus:outline-none focus:border-green-500 placeholder-gray-500 mb-4"
                    onChange={(e) => setFeeling(e.target.value)} 
                    value={feeling}
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {moods.map((mood) => (
                        <button
                            key={mood}
                            type="button"
                            onClick={() => handleMoodClick(mood)}
                            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-1 px-2 rounded-full overflow-hidden whitespace-nowrap text-ellipsis"
                        >
                            {mood}
                        </button>
                    ))}
                </div>
                <div className="mt-8 flex justify-end">  {/* Changed to justify-end */}
                    <button
                        type="button"
                        onClick={() => router.push('/main')}
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
                    >
                        Go On
                    </button>
                </div>
            </div>
        </div>
    );
}
