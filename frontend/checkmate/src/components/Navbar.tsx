import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
    // const [isSticky, setIsSticky] = useState(false);
    const loc = useLocation();

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    // useEffect(() => {
    //     const handleScroll = () => {
    //       if (window.scrollY > 0) {
    //         setIsSticky(true);
    //       } else {
    //         setIsSticky(false);
    //       }
    //     };
    
    //     window.addEventListener('scroll', handleScroll);
    
    //     return () => {
    //       window.removeEventListener('scroll', handleScroll);
    //     };
    //   }, []);

    return (
        <div className="max-w-screen-lg w-full h-14 font-dm-serif-display flex justify-between items-center relative">
            <div className="text-2xl flex items-center gap-x-1">
                <img src="/images/chess-king.png" width={28} height={28}/>
                Check Mate
            </div>
            {(menuOpen) ? (
                <div className="w-full rounded-md p-4 text-center md:hidden absolute top-full bg-white flex flex-col">
                    <a className="border-b-2 border-black border-solid py-2" href="/">home</a>
                    <a className="border-b-2 border-black border-solid py-2" href="/">explore</a>
                    <a className="py-2" href="/">download</a>
                </div>
            ) : <></>}
            <button className="flex gap-x-1 md:hidden" type="button" onClick={toggleMenu}>
                s
            </button>
            <div className="hidden md:flex items-center gap-x-4 text-xl pointer-events-auto">
                <a className={`${loc.pathname === '/' ? 'active-link':''}`} href="/">home</a>
                <a className={`${loc.pathname === '/explore' ? 'active-link' : ''}`} href="/explore">explore</a>
                <a className={`${loc.pathname === '/download' ? 'active-link' : ''}`} href="/download">download</a>
            </div>
        </div>
    )

}