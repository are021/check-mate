import { FaCheckCircle, FaChevronCircleDown, FaExclamationCircle, FaQuestionCircle } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface VideoCommentProps {
    truth: string;
    timestamp: string;
    text: string;
    sources: string[];
}

export default function VideoComment({truth, timestamp, text}: VideoCommentProps) {
    const colorLight = (truth === "0") ? "#FCE4E4" : (truth === "1") ? "#EDFCE4" : "#FFEEAD"
    const colorDark = (truth === "0") ? "#F97373" : (truth === "1") ? "#37DD6E" : "#F9F9A3"
    const icon = (truth === "0") ? <FaExclamationCircle size={16} color={colorDark} /> : (truth === "1") ? <FaCheckCircle size={16} color={colorDark}/> : <FaQuestionCircle size={16} color={colorDark}/>
    const res = (truth === "0") ? "incorrect" : (truth === "1") ? "correct" : "unknown"

    return (
        <div>
            <div className="flex gap-x-12 items-center justify-between">
                <div className={twMerge("rounded-t-md px-4 pt-2 font-bold text-base font-courier-new flex gap-x-2 items-center", `bg-[${colorLight}]`)}>
                    {icon}
                    {res}
                </div>
                <div className="font-courier-new font-bold text-base">{timestamp}:00:00</div>
            </div>
            <div className={twMerge("p-4 rounded-md rounded-tl-none", `bg-[${colorLight}]`)}>
                <div className="mb-2 font-courier-new text-base">
                    "{text}"
                </div>
                <button type="button" className="flex gap-x-2 font-courier-new text-base font-bold items-center w-full justify-center">
                    see sources <FaChevronCircleDown />
                </button>
            </div>
        </div>

    )
}