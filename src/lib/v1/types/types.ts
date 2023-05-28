export type Tile = {
    id: number;
    size: number;
    pixels: number[];
};

export type Direction = 'N' | 'E' | 'S' | 'W';

export type Connections = {
    [sourceTileId: number]: {
        [direction in Direction]?: number[];
    };
};

type NotCollapsedCell = {
    collapsed: false;
    possibleTiles: number[];
};
export type Cell = Tile | NotCollapsedCell;

export type Grid = Cell[][];

export function isCollapsedTile(obj: Cell): obj is Tile {
    return (obj as Tile).id !== null && (obj as Tile).id !== undefined;
}

export function isNotCollapsed(obj: Cell): obj is NotCollapsedCell {
    return (obj as NotCollapsedCell).collapsed === false;
}
