import { useState } from "react"
import CenteredLayout from "../layout/CenteredLayout"

export default function Home() {

    const [videoLink, setVideoLink] = useState<string>("")

    return (
        <CenteredLayout>
            <div className="w-full h-full max-w-screen-sm flex flex-col items-center justify-center text-center gap-y-6">
                <h1 className="text-5xl font-dm-serif-display pointer-events-none ">the simple online fact checker for videos</h1>
                <h4 className="text-xl font-courier-new">fact check a source simply by providing a link and we'll do the rest!</h4>
                <div className="max-w-screen-sm w-full flex items-center gap-x-4">
                    <input
                        className="w-full px-4 py-2 border-solid border-[#87A2FF] border-2 rounded-md text-lg font-courier-new pointer-events-auto"
                        onChange={(e) => setVideoLink(e.target.value)}
                    />
                    <a href={`/explore/video?link=${videoLink}`} className="px-4 py-2 font-dm-serif-display text-white rounded-md bg-[#87A2FF] text-lg tracking-wider pointer-events-auto">check</a>
                </div>
                <div className="text-base font-courier-new font-bold flex items-end gap-x-1 text-start">
                    <img src="/images/Arrow 07.png"/>
                    <p className="mb-2">
                        try it out by<br/> linking a video!
                    </p>
                </div>
            </div>
        </CenteredLayout>
    )
}