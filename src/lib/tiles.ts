import { writable } from 'svelte/store';
import type { Tile } from './components/types';

const KEY = 'tiles';

const defaultTiles = [
    {
        id: 0,
        size: 5,
        pixels: [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0]
    },
    {
        id: 1,
        size: 5,
        pixels: [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0]
    },
    {
        id: 2,
        size: 5,
        pixels: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 3,
        size: 5,
        pixels: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0]
    }
];

let tiles = writable<Tile[]>(defaultTiles);

try {
    const storedStr = window.localStorage.getItem(KEY);

    if (storedStr !== null) {
        try {
            tiles = writable<Tile[]>(JSON.parse(storedStr) as Tile[]);
        } catch (e) {
            console.error('Couldnt load local storage');
        }
    }

    tiles.subscribe((value) => {
        window.localStorage.setItem(KEY, JSON.stringify(value));
    });
} catch {
    // Without this catch vite fails to render the pages on the server
    // and the build doesn't finish.
    // So this is a hack to prevent build failures
}

const deleteTiles = () => {
    tiles.set([]);
};

export { deleteTiles, tiles };
