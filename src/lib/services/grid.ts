import type p5 from 'p5';
import { isNotCollapsed, type Connections, type Grid, type Tile } from '$lib/types/types';
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

export const collapseBestCell = (grid: Grid, tiles: Tile[]) => {
    let bestScore = Number.MAX_SAFE_INTEGER;
    let candidates: { x: number; y: number }[] = [];
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x].possibleTiles?.length < bestScore) {
                bestScore = grid[y][x].possibleTiles?.length;
                candidates = [{ x, y }];
            } else if (grid[y][x].possibleTiles?.length === bestScore) {
                candidates.push({ x, y });
            }
        }
    }

    const coordsIndex = Math.floor(Math.random() * candidates.length);
    const coords = candidates[coordsIndex];

    const tileIndex = Math.floor(Math.random() * grid[coords.y][coords.x].possibleTiles?.length);
    const tileId = grid[coords.y][coords.x].possibleTiles[tileIndex];
    const tile = tiles[tileId];
    collapseCell(grid, coords, tile);
};

export const removeImpossibleStates = (grid: Grid, connections: Connections) => {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (isNotCollapsed(grid[y][x])) {
                continue;
            }

            const currentTileId = grid[y][x].id;
            if (y > 0 && grid[y - 1][x].collapsed === false) {
                const allowedNorth = connections[currentTileId].N;
                if (!allowedNorth) {
                    throw new Error('no connections defined for north');
                }
                grid[y - 1][x].possibleTiles = grid[y - 1][x].possibleTiles.filter((id) =>
                    allowedNorth.includes(id)
                );
            }
            if (y < grid.length - 1 && grid[y + 1][x].collapsed === false) {
                const allowedSouth = connections[currentTileId].S;
                if (!allowedSouth) {
                    throw new Error('no connections defined for south');
                }
                grid[y + 1][x].possibleTiles = grid[y + 1][x].possibleTiles.filter((id) =>
                    allowedSouth.includes(id)
                );
            }
            if (x > 0 && grid[y][x - 1].collapsed === false) {
                const allowedWest = connections[currentTileId].W;
                if (!allowedWest) {
                    throw new Error('no connections defined for west');
                }
                grid[y][x - 1].possibleTiles = grid[y][x - 1].possibleTiles.filter((id) =>
                    allowedWest.includes(id)
                );
            }
            if (x < grid[0].length - 1 && grid[y][x + 1].collapsed === false) {
                const allowedEast = connections[currentTileId].E;
                if (!allowedEast) {
                    throw new Error('no connections defined for east');
                }
                grid[y][x + 1].possibleTiles = grid[y][x + 1].possibleTiles.filter((id) =>
                    allowedEast.includes(id)
                );
            }
        }
    }
};

export const drawGrid = (p5: p5, grid: Grid) => {
    const cellSize = p5.width / grid[0].length;

    p5.stroke(255);
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (isNotCollapsed(grid[y][x])) {
                p5.noFill();
                p5.stroke(255);
                p5.rect(x * cellSize, y * cellSize, cellSize, cellSize);
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
