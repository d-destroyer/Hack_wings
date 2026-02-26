// Tile click to expand functionality
const tiles = document.querySelectorAll('.tile');
const slides = document.querySelectorAll('.slide');

tiles.forEach(tile => {
    tile.addEventListener('click', () => {
        // Close all other expanded tiles
        tiles.forEach(t => {
            if (t !== tile && t.classList.contains('expanded')) {
                t.classList.remove('expanded');
            }
        });
        
        // Toggle the clicked tile
        tile.classList.toggle('expanded');
    });
});

// Horizontal scroll with mouse wheel
const container = document.querySelector('.carousel-container');

container.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
    }
});
