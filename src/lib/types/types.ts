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
