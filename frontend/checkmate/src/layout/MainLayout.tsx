import InteractiveGrid from "../components/InteractiveGrid";
import Navbar from "../components/Navbar";

interface MainLayoutProps {
    children: string | JSX.Element | JSX.Element[];
}

export default function MainLayout({children}: MainLayoutProps) {
    return (
        <div className="w-screen h-screen flex flex-col items-center py-8 px-4 md:px-8 lg:px-16">
            <InteractiveGrid/>
            <div className="pointer-events-none z-4">
            <Navbar/>
            {children}
            </div>
        </div>
    )
}