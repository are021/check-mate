import MainLayout from "../layout/MainLayout"
import "./explore.css";
import ExploreFeed from "../components/ExploreFeed";


// VIDEO PREVIEW
export default function Explore() {
    return (
        <MainLayout>
            <img src="../../../images/Bubble.png" alt="Top Right" className="top-right" />
            <img src="../../../images/Boy.png" alt="Bottom Left" className="bottom-left" />
            <div className="w-full h-full max-w-screen-sm flex flex-col items-center justify-center text-center gap-y-6">
                <ExploreFeed />
            </div>
        </MainLayout>
    )
}