import MainLayout from "../layout/MainLayout"

export default function Download() {
    return (
        <MainLayout>
            <div className="w-full h-full max-w-screen-sm flex flex-col items-center justify-center text-center gap-y-6">
                <h1 className="text-5xl font-dm-serif-display pointer-events-none">download the extension</h1>
                <h4 className="text-xl font-courier-new">fact check videos on the fly by downloading our extension!</h4>
                
                <div className="relative flex items-center justify-center">
                    {/* Download button wrapper for arrow positioning */}
                    <button className="px-4 py-2 font-dm-serif-display text-white rounded-md bg-[#87A2FF] text-lg tracking-wider">
                        download
                    </button>

                    {/* Arrow image */}
                    <img
                        src="/images/Arrow.png" // Using the provided path for the arrow image
                        alt="Curved arrow"
                        className="absolute left-[calc(100%+10px)] top-[50%] transform -translate-y-1/2 w-32z" // Adjust the width as needed
                    />

                </div>

                <div className="">
                    <div className="font-courier-new w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl text-left">
                        <p className="text-gray-500 text-base mb-1">demo video</p>
                    </div>

                    <video
                        className="pointer-events-auto w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px]"
                        controls
                        preload="auto"
                    >
                        <source src="/videos/testvideo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </MainLayout>
    )
}
