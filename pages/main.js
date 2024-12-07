import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Main() {
  const router = useRouter();
  const { mood } = router.query;

  const [selectedMood, setSelectedMood] = useState(mood || null);
  const [book, setBook] = useState(null);
  const [music, setMusic] = useState(null);
  const [movie, setMovie] = useState(null);
  const [dbError, setDbError] = useState(null);
  const [moodsData, setMoodsData] = useState([]); // Initialize moodsData

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await axios.get('/api/moods'); // New API route to fetch moods
        setMoodsData(response.data);
      } catch (error) {
        console.error("Error fetching moods:", error);
        // Handle the error, perhaps set a default moodsData or display an error message
      }
    };

    fetchMoods();
  }, []); // Fetch moods only once on component mount

  useEffect(() => {
    if (mood) {
      handleMoodClick(mood);
    }
  }, [mood]);
  
  const handleMoodClick = async (mood) => {
    setSelectedMood(mood);
    try {
        const [bookRes, musicRes, movieRes] = await Promise.all([
            axios.get(`/api/book?mood=${mood}`),
            axios.get(`/api/music?mood=${mood}`),
            axios.get(`/api/movie?mood=${mood}`),
        ]);
        setBook(bookRes.data);
        setMusic(musicRes.data);
        setMovie(movieRes.data);
        setDbError(null);
    } catch (error) {
        console.error("Error fetching data:", error);
        setDbError("Error fetching data.");
        setBook(null);
        setMusic(null);
        setMovie(null);
    }
};

  const handleAddMood = () => {
    // Logic to add a new mood
  };

  return (
    <div 
      className="relative w-screen h-screen flex items-center justify-center"
      style={{ 
        backgroundImage: `url('/background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="grid grid-cols-2 gap-10">
        {/* My Page Overlay */}
        <div className="w-[500px] h-[350px] bg-[#181818] bg-opacity-90 p-6 rounded-lg shadow-md text-white"> 
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">My Page</h2>
            <button className="text-gray-400 hover:text-gray-300">edit</button>
          </div>

          <div className="mb-4">
            <p className="text-sm">Username: @Amjn23</p>
            <p className="text-sm">E-mail: amuujin@ajou.ac.kr</p> 
          </div>

          <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">My Moods</h3>
            <div className="flex flex-wrap gap-2">
              {moodsData.map((mood) => (
                <button
                  key={mood}
                  onClick={() => handleMoodClick(mood)} // Call handleMoodClick
                  className={`bg-gray-700 hover:bg-gray-600 text-white font-medium py-1 px-3 rounded-full text-xs ${selectedMood === mood ? 'bg-blue-500' : ''}`} // Highlight selected mood
                >
                  {mood}
                </button>
              ))}
              <button 
                onClick={handleAddMood}
                className="border border-gray-600 hover:border-gray-500 text-white font-medium py-1 px-3 rounded-full text-xs"
              >
                add mood
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-2">Favourites</h3>
            <div className="bg-gray-700 rounded-md p-3 text-center text-sm text-gray-400">
              No data found
            </div>
          </div>
        </div>
        {/* Musics Overlay */}
        <div className="w-[500px] h-[350px] bg-[#181818] bg-opacity-90 p-6 rounded-lg shadow-md text-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Music</h2>
          </div>
          {dbError ? (
            <div className="bg-gray-700 rounded-md p-3 text-center text-sm text-gray-400">
              {dbError}
            </div>
          ) : music ? (
            <div>
              <h4 className="text-lg font-bold mb-2">{music.title} by {music.artist}</h4>
              <p className="text-sm">Genre: {music.genre}</p>
              {music.youtubelink && (
                <div className="mt-2">
                  <iframe width="100%" height="200" src={`https://www.youtube.com/embed/${music.youtubelink}`} title={music.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
              )}
              {!music.youtubelink && <p className="text-sm text-gray-400">Video unavailable</p>}
            </div>
          ) : (
            <div className="bg-gray-700 rounded-md p-3 text-center text-sm text-gray-400">
              Loading music...
            </div>
          )}
        </div>

        {/* Movies Overlay */}
        <div className="w-[500px] h-[350px] bg-[#181818] bg-opacity-90 p-6 rounded-lg shadow-md text-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Movie</h2>
          </div>
          {dbError ? (
            <div className="bg-gray-700 rounded-md p-3 text-center text-sm text-gray-400">
              {dbError}
            </div>
          ) : movie ? (
            <div>
              <h4 className="text-lg font-bold mb-2">{movie.title} ({movie.year})</h4>
              <p className="text-sm">Genre: {movie.genre}</p>
            </div>
          ) : (
            <div className="bg-gray-700 rounded-md p-3 text-center text-sm text-gray-400">
              Loading movie...
            </div>
          )}
        </div>

        {/* Books Overlay */}
        <div className="w-[500px] h-[350px] bg-[#181818] bg-opacity-90 p-6 rounded-lg shadow-md text-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Book</h2>
          </div>
          {dbError ? (
            <div className="bg-gray-700 rounded-md p-3 text-center text-sm text-gray-400">
              {dbError}
            </div>
          ) : book ? (
            <div>
              <h4 className="text-lg font-bold mb-2">{book.title} by {book.author}</h4>
              <p className="text-sm">Genre: {book.genre}</p>
            </div>
          ) : (
            <div className="bg-gray-700 rounded-md p-3 text-center text-sm text-gray-400">
              Loading book...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}