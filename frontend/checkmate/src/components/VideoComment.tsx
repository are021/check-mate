import { FaCheckCircle, FaChevronCircleDown, FaChevronCircleUp, FaExclamationCircle, FaQuestionCircle } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { useState } from 'react';

interface VideoCommentProps {
    data: [string, string, string?];
}

export default function VideoComment({data}: VideoCommentProps) {
    const [openDropdown, setDropdown] = useState(false);
    let [id, text, link] = data;
    id = id.toString()[0];

    const toggleDropdown = () => setDropdown(!openDropdown);

    return (id ? 
        <div>
            <div className="flex gap-x-12 items-center justify-between">
                <div className={twMerge("rounded-t-md px-4 pt-2 font-bold text-base font-courier-new flex gap-x-2 items-center", (id === "0") ? "bg-[#FCE4E4]" : (id === "1") ? "bg-[#EDFCE4]" : "bg-[#FFEEAD]")}>
                    {(id === "0") ? <FaExclamationCircle size={12} /> : (id === "1") ? <FaCheckCircle size={12} /> : <FaQuestionCircle size={12} />}
                    {(id === "0") ? "incorrect" : (id === "1") ? "correct" : "unknown"}
                </div>
                {/* <div className="font-courier-new font-bold text-base">{key}:00:00</div> */}
            </div>
            <div className={twMerge("p-4 rounded-md rounded-tl-none", (id === "0") ? "bg-[#FCE4E4]" : (id === "1") ? "bg-[#EDFCE4]" : "bg-[#FFEEAD]")}>
                <div className="mb-2 font-courier-new text-base" onClick={toggleDropdown}>
                    "{text}"
                </div>
                
                {link ? <div><button type="button" onClick={toggleDropdown} className="flex gap-x-2 font-courier-new text-base font-bold items-center w-full justify-center">
                        see source {openDropdown ? <FaChevronCircleUp /> : <FaChevronCircleDown />}
                    </button>
                    <div className="font-courier-new text-base font-bold items-center">
                        {openDropdown ? <a className="items-center font-bold underline" href={link}>{link}</a>: null}
                    </div> 
                </div>: <></>}
                
            </div>
        </div>
    : null)
}