import { useEffect } from "react";

export default function InteractiveGrid() {
    
    function createGrid() {
        console.log("eat my ass");
        // calculate the number of rows and columns needed
        const size = document.body.clientWidth > 800 ? 100 : 50;
        const cols = Math.floor(document.body.clientWidth / size);
        const rows = Math.floor(document.body.clientHeight / size);

        // set the css variables to sync
        document.documentElement.style.setProperty('--columns', cols.toString());
        document.documentElement.style.setProperty('--rows', rows.toString());

        // generate all the grid divs
        let grid = document.getElementById('grid');
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < cols; j++) {
                let tile = document.createElement('div');
                tile.classList.add((((i % 2) + j) % 2) ? 'tile' : 'black-tile')
                grid?.appendChild(tile);
            }
        }
    }

    useEffect(() => {

        createGrid();
        window.addEventListener('resize', () => {createGrid();});

        return () => {
            window.removeEventListener('resize', () => {createGrid();});
        };
    }, []);
    
    return (
        <div id="grid"></div>
    )
}