import { useState, useEffect } from 'react';
import VideoPreview from './VideoPreview';

export default function ExploreFeed() {
  const [videos, setVideos] = useState([
        { videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { videoUrl: 'https://www.youtube.com/embed/eVTXPUF4Oz4' },
        { videoUrl: 'https://www.youtube.com/embed/3JZ_D3ELwOQ' },
        { videoUrl: 'https://www.youtube.com/embed/L_jWHffIx5E' },
        { videoUrl: 'https://www.youtube.com/embed/fJ9rUzIMcZQ' },
        { videoUrl: 'https://www.youtube.com/embed/RgKAFK5djSk' },
        { videoUrl: 'https://www.youtube.com/embed/OPf0YbXqDm0' },
        { videoUrl: 'https://www.youtube.com/embed/hT_nvWreIhg' },
        { videoUrl: 'https://www.youtube.com/embed/oHg5SJYRHA0' },
        { videoUrl: 'https://www.youtube.com/embed/ktvTqknDobU' },
    ]);

  // Fetch video data on page load
//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const response = await fetch('https://checkmate-backend-8puv.onrender.com/recent-videos'); // Replace with your API URL
//         const data = await response.json();
//         setVideos(data.videos); // Assume the response contains an array of videos in data.videos
//       } catch (error) {
//         console.error('Error fetching videos:', error);
//       }
//     };

//     fetchVideos();
//   }, []);

    return (
        <div className="content-center">
            <h1 className="text-4xl font-dm-serif-display mb-8 content-start active-link">Explore</h1>
            <div className="grid grid-cols-5 gap-8 pointer-events-auto">
                {videos ? videos.map((video, index) => (
                    <VideoPreview
                        key={index} // Unique key for each element in the list
                        videoURL={video.videoUrl} // Corrected prop name
                        width="200"
                        height="300"
                    />
                )) : <h1>Error loading videos</h1>}
            </div>
        </div>
    );
}
