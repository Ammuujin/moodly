import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';



const YOUTUBE_API_KEY = 'AIzaSyAMaolcZkxZSf1NVgxnUkyKkFmyRoNRzzw';


export default function Main() {
  const router = useRouter();
  const { mood } = router.query;

  const [selectedMood, setSelectedMood] = useState(mood || null);
  const [book, setBook] = useState(null);
  const [music, setMusic] = useState(null);
  const [movie, setMovie] = useState(null);
  const [dbError, setDbError] = useState(null);
  const [moodsData, setMoodsData] = useState(null); // Initialize moodsData

  const playerRef = useRef(null);

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

        // Fetch YouTube link for the music
        const musicData = musicRes.data;
        const youtubeLink = await fetchYouTubeLink(musicData.title, musicData.artist); 
        setMusic({ ...musicData, youtubelink: youtubeLink });

    } catch (error) {
        console.error("Error fetching data:", error);
        setDbError("Error fetching data.");
        setBook(null);
        setMusic(null);
        setMovie(null);
    }
};

// Function to fetch YouTube link based on title and artist
const fetchYouTubeLink = async (title, artist) => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: `${title} by ${artist}`, // Search query
        type: 'video',
        key: YOUTUBE_API_KEY, 
      }
    });

    const items = response.data.items;
    if (items.length > 0) {
      return items[0].id.videoId; // Return the first video ID
    } else {
      return null; // No video found
    }
  } catch (error) {
    console.error('Error fetching YouTube link:', error);
    return null;
  }
};

// Shuffle Function
const handleShuffle = async () => {
  if (music) {
    try {
      // Fetch a new music video with the same mood
      const musicRes = await axios.get(`/api/music?mood=${selectedMood}`);
      const newMusicData = musicRes.data;

      // Fetch YouTube link for the new music
      const youtubeLink = await fetchYouTubeLink(
        newMusicData.title,
        newMusicData.artist
      );
      setMusic({ ...newMusicData, youtubelink: youtubeLink });
    } catch (error) {
      console.error("Error shuffling music:", error);
      // Handle the error, e.g., show an error message
    }
  }
};
// Play Function
const handlePlay = () => {
  if (playerRef.current) {
    playerRef.current.contentWindow.postMessage(
      '{"event":"command","func":"playVideo","args":""}',
      "*"
    );
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
          {/* ... */}
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">My Moods</h3>
            <div className="flex flex-wrap gap-2">
              {moodsData ? ( // Check if moodsData has data
                moodsData.map((mood) => (
                  <button 
                    key={mood} 
                    onClick={() => handleMoodClick(mood)} 
                    className={`bg-gray-700 hover:bg-gray-600 text-white font-medium py-1 px-3 rounded-full text-xs ${selectedMood === mood ? 'bg-blue-500' : ''}`}
                  >
                    {mood}
                  </button>
                ))
              ) : ( // Show a loading message while fetching
                <div className="bg-gray-700 rounded-md p-3 text-center text-sm text-gray-400">
                  Loading moods...
                </div>
              )}

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
      <div className="flex"> {/* Single flex container */}
      {music.youtubelink ? (
                <iframe // Changed from <img> to <iframe>
                  width="200" // Adjust width as needed
                  height="150" // Adjust height as needed
                  src={`https://www.youtube.com/embed/${music.youtubelink}`}
                  title={music.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="mr-4" // Add margin for spacing
                  ref={playerRef} // Add ref to the iframe
                ></iframe>
              ) : (
                <div className="w-24 h-24 bg-gray-700 mr-4" />
              )}
        <div>
                <h4 className="text-lg font-bold mb-2">
                  {music.title} by {music.artist}
                </h4>
                <p className="text-sm">Genre: {music.top_genre}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              <button className="bg-gray-700 px-4 py-2 rounded-md" onClick={handleShuffle}>
                Shuffle
              </button>
            </div>
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
              <div className="flex"> {/* Added flex container */}
                <img 
                  src={movie.poster} 
                  alt={movie.title} 
                  className="w-24 h-32 object-cover mr-4" 
                />
                <div> {/* Added container for text content */}
                  <h4 className="text-lg font-bold mb-2">{movie.title} ({movie.year})</h4>
                  <p className="text-sm">Genre: {movie.genre}</p>
                  <p className="text-sm mt-2">{movie.description}</p> {/* Added description */}
                </div>
              </div>
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
              <div className="flex">
                <img
                  src={book["Image-URL-L"]}
                  alt={book["Book-Title"]}
                  className="w-24 h-32 object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-bold mb-2">{book["Book-Title"]}</h4>
                  <p className="text-sm">by {book["Book-Author"]}</p> {/* Moved author here */}
                  <p className="text-sm mt-2">{book["Year-Of-Publication"]}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-4"> {/* Added buttons */}
                <button className="bg-gray-700 px-4 py-2 rounded-md">Shuffle</button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-700 rounded-md p-3 text-center text-sm text-gray-400">
              Loading book...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
