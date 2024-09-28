import InteractiveGrid from "../components/InteractiveGrid"
import Navbar from "../components/Navbar"

export default function Home() {
    return (
        <div className="w-screen h-screen flex flex-col items-center py-8 px-4">
            <InteractiveGrid/>
            <Navbar />
            <div className="w-full h-full max-w-screen-sm flex flex-col items-center justify-center text-center z-3 gap-y-6">
                <h1 className="text-5xl font-dm-serif-display pointer-events-none ">the simple online fact checker for videos</h1>
                <h4 className="text-xl font-courier-new">fact check a source simply by providing a link and we'll do the rest!</h4>
                <div className="max-w-screen-sm w-full flex items-center gap-x-4">
                    <input
                        className="w-full px-4 py-2 border-solid border-[#87A2FF] border-2 rounded-md text-lg font-courier-new"
                    />
                    <button className="px-4 py-2 font-dm-serif-display text-white rounded-md bg-[#87A2FF] text-lg tracking-wider">check</button>
                </div>
            </div>
        </div>
    )
}