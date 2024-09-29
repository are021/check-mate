import { useState, useEffect } from 'react';
import VideoPreview from './VideoPreview';

export default function ExploreFeed() {
    const [videos, setVideos] = useState<any | null>(null);

  // Fetch video data on page load
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('https://checkmate-backend-8puv.onrender.com/recent-videos'); // Replace with your API URL
        let data = await response.json();
        if (data) {
          setVideos(data);
        }
      } catch (error) {
        console.log('Error fetching videos:', error);
      }
    };

        fetchVideos();
    }, []);

    return (
        <div className="content-center">
            <h1 className="text-5xl font-dm-serif-display pointer-events-none">recently checked videos</h1>
            <div className="grid grid-cols-5 gap-8 ">
                {(videos !== null) ? videos.map((video:any, index:number) => (
                    <VideoPreview
                        key={index} // Unique key for each element in the list
                        videoURL={video.url} // Corrected prop name
                        width="150"
                        height="250"
                    />
                )) : <h1>Error loading videos</h1>}
            </div>
        </div>
    );
}
