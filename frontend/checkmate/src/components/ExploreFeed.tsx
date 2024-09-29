import { useState } from 'react';
import VideoPreview from './VideoPreview';


export default function ExploreFeed() {
    // const [videos, setVideos] = useState([]);



    return (
        <div>
            <h1 className="text-4xl font-dm-serif-display">Explore Page</h1>
            <VideoPreview />
        </div>
    

    );
}