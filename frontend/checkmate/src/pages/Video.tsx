import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import VideoComment from "../components/VideoComment";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";

interface AiResult {
    [key: string]: Information;
}

interface Information {
    information: string[][];
}

interface FactCheckData {
    ai_result: AiResult;
}

export default function Video() {

    const [code, setCode] = useState<string>("")
    const [factCheckData, setFactCheckData] = useState<FactCheckData | null>(null);
    const [loading, setLoading] = useState(true);
    const [mobileShowChecks, setMobileShowChecks] = useState(false);

    // get the video link from the query string
    const urlParams = new URLSearchParams(window.location.search);
    const videoLink = urlParams.get("link");

    function getVideoCode() {
         const re = new RegExp('(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/)|youtu\.be\/)([0-9A-Za-z_-]{11})')
         if (videoLink) {
             const code = re.exec(videoLink);
            if (code) {
                setCode(code[1]);
            }
        }
    }
  
    useEffect(() => {

        async function fetchVideoData() {
            // console.log(videoLink)
            // console.log("https://checkmate-backend-8puv.onrender.com/" )
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/factcheck`, {
            // const response = await fetch(`http://127.0.0.1:8000/factcheck`, {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({url: videoLink})
            })
            const data = await response.json();
            console.log(data)
            setFactCheckData(data);
            setLoading(false);
        }        
        fetchVideoData();
        getVideoCode();
      
    }, [])

    return (videoLink) ? (
        <MainLayout>
            <div className="w-full justify-center items-center flex flex-col">
                <h1 className="text-3xl font-dm-serif-display mb-4">
                 fact checker
                </h1>
                <div className="flex gap-x-12 relative">
                    <iframe
                        className="rounded-md w-[360px] max-h-[600px] aspect-[9/16] pointer-events-auto"
                        src={`https://www.youtube.com/embed/${code}`}
                        title=""
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                        allowFullScreen
                    />

                    <div className="max-w-[320px] w-full flex md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 flex-col">
                        <div className="max-h-[320px] pointer-events-auto overflow-y-auto flex flex-col gap-y-8">
                            {(mobileShowChecks) ? factCheckData ? Object.keys(factCheckData.ai_result).map((key) => {
                                    return factCheckData.ai_result[key].information.map((data: string[]) => {
                                       return <VideoComment data={data}/>
                                    })
                            }) : <></>:<></>}
                        </div>
                        <button type="button" className="w-full mt-4 bg-white rounded-md p-4 flex items-center justify-center gap-x-2 font-courier-new font-bold pointer-events-auto" onClick={() => {setMobileShowChecks(!mobileShowChecks)}}>{(mobileShowChecks) ? "Hide" : "Show"} Checks {(mobileShowChecks) ? <FaChevronCircleDown/> : <FaChevronCircleUp/>}</button>
                    </div>
                    <div className="hidden md:block">
                    <div className="flex flex-col gap-y-8 max-w-[360px] max-h-[600px] overflow-y-auto pointer-events-auto">
                        {loading ?
                                <div className="flex items-center justify-center flex-grow animate-spin px-10 py-10">                               {/* Chess King Spinner */}
                                    <img 
                                        src="/images/chess-king.png" 
                                        width={100} 
                                        height={100} 
                                    />
                                </div>
                     : 
                            factCheckData ? Object.keys(factCheckData.ai_result).map((key) => {
                                return factCheckData.ai_result[key].information.map((data: string[]) => {
                                   return <VideoComment data={data}/>
                                })
                            }) : <></>
                        }
                    </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    ) : <></>
}