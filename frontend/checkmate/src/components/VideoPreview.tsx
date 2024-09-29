import { useNavigate } from 'react-router-dom';


function convertShortsToEmbed(shortsUrl:string) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/shorts\/|youtu\.be\/)([^/?]+)/;
    const match = shortsUrl.match(regex);
  
    if (match && match[1]) {
      const videoId = match[1];
      return `https://www.youtube.com/embed/${videoId}?controls=1&autoplay=0&mute=1&showinfo=0&modestbranding=1`;
    }
  
    // Return null or an error message if the URL is invalid
    return null;
  }
  

const VideoPreview = ({ videoURL="", width = '200', height = '300' }) => {
  const navigate = useNavigate();
  const embedUrl = convertShortsToEmbed(videoURL);

  const handleRedirect = () => {
    // Redirect to another URL and pass the current video URL as a query parameter
    navigate(`/explore/video?link=${encodeURIComponent(videoURL)}`);
  };
  
    return (
      <div className="relative inline-block p-2">
        <iframe
            width={width}
            height={height}
            src={embedUrl? embedUrl : ""}
            title="Video Preview"
            className="rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
        <button
            onClick={handleRedirect}
            className="font-courier-new absolute bottom-3 right-3 z-20 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded pointer-events-auto font-bold"
        >View</button>
      </div>
    );
  };
  
  export default VideoPreview;
  