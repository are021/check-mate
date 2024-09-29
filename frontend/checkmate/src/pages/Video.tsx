import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { FaCheckCircle, FaChevronCircleDown, FaExclamationCircle, FaQuestionCircle } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

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
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/factcheck`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({url: videoLink})
            })
            const data = await response.json();
            setFactCheckData(data);
        }        
        fetchVideoData();
        getVideoCode();

    }, [])

    return (videoLink) ? (
        <MainLayout>
            <div className="w-full justify-center items-center flex flex-col">
                <h1 className="text-3xl font-dm-serif-display mb-4">
                    title summary
                </h1>
                <div className="flex gap-x-12">
                    <iframe
                        className="rounded-md max-w-[300px] w-full h-full aspect-[9/16] pointer-events-auto"
                        src={`https://www.youtube.com/embed/${code}`}
                        title=""
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                        allowFullScreen
                    />
                    <div className="flex flex-col gap-y-8 max-w-[360px] max-h-[600px] overflow-y-auto pointer-events-auto">
                        {
                            factCheckData ? Object.keys(factCheckData.ai_result).map((key) => {
                                return factCheckData.ai_result[key].information.map((data: string[]) => {
                                    const [id, text, source] = data;
                                    return (
                                        <div>
                                            <div className="flex gap-x-12 items-center justify-between">
                                                <div className={twMerge("rounded-t-md px-4 pt-2 font-bold text-base font-courier-new flex gap-x-2 items-center", (id === "0") ? "bg-[#FCE4E4]" : (id === "1") ? "bg-[#EDFCE4]" : "bg-[#FFEEAD]")}>
                                                    {(id === "0") ? <FaExclamationCircle size={12} /> : (id === "1") ? <FaCheckCircle size={12} /> : <FaQuestionCircle size={12} />}
                                                    {(id === "0") ? "incorrect" : (id === "1") ? "correct" : "unknown"}
                                                </div>
                                                <div className="font-courier-new font-bold text-base">{key}:00:00</div>
                                            </div>
                                            <div className={twMerge("p-4 rounded-md rounded-tl-none", (id === "0") ? "bg-[#FCE4E4]" : (id === "1") ? "bg-[#EDFCE4]" : "bg-[#FFEEAD]")}>
                                                <div className="mb-2 font-courier-new text-base">
                                                    "{text}"
                                                </div>
                                                <button type="button" className="flex gap-x-2 font-courier-new text-base font-bold items-center w-full justify-center">
                                                    see sources <FaChevronCircleDown />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            }) : <></>
                        }
                    </div>
                </div>
            </div>
        </MainLayout>
    ) : <></>
}