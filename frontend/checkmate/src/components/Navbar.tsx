import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const loc = useLocation();

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    useEffect(() => {

        const king = document.getElementById('navbar-logo');
        king?.addEventListener('mouseenter', () => {
            king.classList.add('fall');
        })

        return () => {
            king?.removeEventListener('mouseenter', () => {})
        }

    }, []);

    return (
        <div className="max-w-screen-lg w-full h-14 font-dm-serif-display flex justify-between items-center relative">
            <a href="/" className="text-2xl flex items-center gap-x-1 pointer-events-auto">
                <img id="navbar-logo" src="/images/chess-king.png" width={28} height={28}/>
                Check Mate
            </a>
            {(menuOpen) ? (
                <div className="w-full rounded-md p-4 text-center md:hidden absolute top-full bg-white flex flex-col pointer-events-auto border-2 border-solid border-black">
                    <a className="border-b-2 border-black border-solid py-2" href="/">home</a>
                    <a className="border-b-2 border-black border-solid py-2" href="/explore">explore</a>
                    <a className="py-2" href="/download">download</a>
                </div>
            ) : <></>}
            <button className="flex gap-x-1 md:hidden pointer-events-auto" type="button" onClick={toggleMenu}>
                <FaBars size={24}/>
            </button>
            <div className="hidden md:flex items-center gap-x-4 text-xl pointer-events-auto">
                <a className={`${loc.pathname === '/' ? 'active-link':''}`} href="/">home</a>
                <a className={`${loc.pathname === '/explore' ? 'active-link' : ''}`} href="/explore">explore</a>
                <a className={`${loc.pathname === '/download' ? 'active-link' : ''}`} href="/download">download</a>
            </div>
        </div>
    )

}