<script lang="ts">
    import { tiles } from '$lib/tiles';
    import type { Tile } from './types';

    type Cell =
        | Tile
        | {
              collapsed: false;
              possibleTiles: number[];
          };

    const gridSize = 10;

    const nbTiles = $tiles.length;
    const initialChoices = new Array(nbTiles).fill(0).map((_, id) => id);
    const grid: Cell[][] = new Array(gridSize).fill(0).map((_) =>
        new Array(gridSize).fill(0).map((_) => {
            return { collapsed: false, possibleTiles: [...initialChoices] };
        })
    );
</script>

<h3>Grid generator</h3>
