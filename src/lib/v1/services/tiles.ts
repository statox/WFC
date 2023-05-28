import type { Tile } from '$lib/v1/types/types';
import type p5 from 'p5';

export const drawTileInRect = (
    p5: p5,
    tile: Tile,
    rect: { x: number; y: number; size: number },
    tint?: number
) => {
    p5.noStroke();
    const scale = rect.size / tile.size;
    tile.pixels.forEach((color, index) => {
        const x = index % tile.size;
        const y = Math.floor(index / tile.size);
        p5.fill(color * (tint || 255));
        p5.rect(rect.x + x * scale, rect.y + y * scale, scale, scale);
    });
};
