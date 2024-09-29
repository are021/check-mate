import MainLayout from "../layout/MainLayout";
import "./explore.css";
import ExploreFeed from "../components/ExploreFeed";

// VIDEO PREVIEW
export default function Explore() {
    return (
        <MainLayout>
            <div className="relative w-full h-full">
                {/* Adjust the size and positioning of the top-right image */}
                <img 
                    src="../../../images/Bubble.png" 
                    alt="Top Right" 
                    className="absolute top-0 right-0 h-32 md:h-48 lg:h-56 max-w-none" 
                />
                {/* Adjust the size and positioning of the bottom-left image */}
                <img 
                    src="../../../images/Boy.png" 
                    alt="Bottom Left" 
                    className="absolute bottom-0 left-0 h-32 md:h-48 lg:h-56 max-w-none" 
                />
                <div className="w-5/6 h-full flex flex-col items-center text-center gap-y-6 mx-auto">
                    <ExploreFeed />
                </div>
            </div>
        </MainLayout>
    );
}
