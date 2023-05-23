import type { Tile } from '$lib/types/types';
import type p5 from 'p5';

export const drawTile = (p5: p5, tile: Tile) => {
    const scale = p5.width / tile.size;

    tile.pixels.forEach((color, index) => {
        const x = index % tile.size;
        const y = Math.floor(index / tile.size);
        p5.fill(color * 255);
        p5.rect(x * scale, y * scale, scale, scale);
    });
};
