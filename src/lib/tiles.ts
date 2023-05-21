import { writable } from 'svelte/store';
import type { Tile } from './components/types';

const KEY = 'tiles';
let tiles = writable<Tile[]>([]);

try {
    const storedStr = window.localStorage.getItem(KEY);

    if (storedStr !== null) {
        try {
            tiles = writable<Tile[]>(JSON.parse(storedStr) as Tile[]);
        } catch (e) {
            console.error('Couldnt load project from local storage');
            tiles = writable<Tile[]>([]);
        }
    } else {
        tiles = writable<Tile[]>([]);
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
