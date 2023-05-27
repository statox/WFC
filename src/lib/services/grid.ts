import type p5 from 'p5';
import { isNotCollapsed, type Grid, type Tile } from '$lib/types/types';
import { drawTileInRect } from './tiles';

export const getNewGrid = (tiles: Tile[], dimension: number) => {
    const tileIds = tiles.map((t) => t.id);
    const grid: Grid = new Array(dimension).fill(0).map((_) =>
        new Array(dimension).fill(0).map((_) => {
            return { collapsed: false, possibleTiles: [...tileIds] };
        })
    );

    return grid;
};

export const collapseCell = (grid: Grid, cell: { x: number; y: number }, tile: Tile) => {
    grid[cell.y][cell.x] = tile;
};

export const drawGrid = (p5: p5, grid: Grid) => {
    const cellSize = p5.width / grid[0].length;

    p5.stroke(255);
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            p5.noFill();
            p5.stroke(255);
            p5.rect(x * cellSize, y * cellSize, cellSize, cellSize);
            if (isNotCollapsed(grid[y][x])) {
                const text = grid[y][x].possibleTiles.join(',');
                p5.fill(255);
                p5.noStroke();
                p5.text(text, x * cellSize, y * cellSize + cellSize / 2);
            } else {
                drawTileInRect(p5, grid[y][x] as Tile, {
                    x: x * cellSize,
                    y: y * cellSize,
                    size: cellSize
                });
            }
        }
    }
};
