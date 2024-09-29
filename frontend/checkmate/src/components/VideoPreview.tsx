import { useNavigate } from 'react-router-dom';

const VideoPreview = ({ videoURL = 'https://www.youtube.com/embed/dQw4w9WgXcQ', width = '200', height = '300' }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    // Redirect to another URL and pass the current video URL as a query parameter
    navigate(`/target-url?video=${encodeURIComponent(videoURL)}`);
  };
    return (
      <div className="relative inline-block p-2">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-[140px] h-[320px] bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 rounded-full opacity-50"></div>
        </div>
        <div className="relative z-10 rounded-lg border-4 border-blue-200 p-1">
            <iframe
                width={width}
                height={height}
                src={videoURL}
                title="Video Preview"
                className="rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            <button
                onClick={handleRedirect}
                className="absolute bottom-3 right-0 z-20 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
            >View!</button>
        </div>
      </div>
    );
  };
  
  export default VideoPreview;
  