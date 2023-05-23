<script lang="ts">
    import { tiles } from '$lib/stores/tiles';
    import type { Tile } from '../types/types';

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
