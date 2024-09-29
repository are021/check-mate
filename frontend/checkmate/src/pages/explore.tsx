import MainLayout from "../layout/MainLayout"
import "./explore.css";
import ExploreFeed from "../components/ExploreFeed";


// VIDEO PREVIEW
export default function Explore() {
    return (
        <MainLayout>
            <img src="../../../images/Bubble.png" alt="Top Right" className="top-right" />
            <img src="../../../images/Boy.png" alt="Bottom Left" className="bottom-left" />
            <div className="w-5/6 h-full flex flex-col items-center text-center gap-y-6 mx-auto">
                <ExploreFeed />
            </div>
        </MainLayout>
    )
}