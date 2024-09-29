import InteractiveGrid from "../components/InteractiveGrid";
import Navbar from "../components/Navbar";

interface MainLayoutProps {
    children: string | JSX.Element | JSX.Element[];
}

export default function MainLayout({children}: MainLayoutProps) {
    return (
        <div className="w-screen h-screen cursor-pointer">
            <InteractiveGrid/>
            <div className="w-full h-full top-0 absolute translate-x-1/2 -left-1/2 py-8 px-4 md:px-8 lg:px-16 flex flex-col items-center pointer-events-none">
                <Navbar/>
                {children}
            </div>
        </div>
    )
}