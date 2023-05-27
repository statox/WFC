<script lang="ts">
    import { collapseCell, drawGrid, getNewGrid } from '$lib/services/grid';
    import { tiles } from '$lib/stores/tiles';
    import type p5 from 'p5';
    import P5, { type Sketch } from 'p5-svelte';
    import { onDestroy } from 'svelte';
    import type { Grid } from '../types/types';

    const screenSize = 500;
    const gridSize = 5;
    const grid: Grid = getNewGrid($tiles, gridSize);
    collapseCell(grid, { x: 0, y: 0 }, $tiles[0]);
    collapseCell(grid, { x: 1, y: 1 }, $tiles[1]);
    collapseCell(grid, { x: 2, y: 2 }, $tiles[2]);
    collapseCell(grid, { x: 3, y: 3 }, $tiles[3]);
    collapseCell(grid, { x: 4, y: 4 }, $tiles[4]);

    let _p5: p5;

    const sketch: Sketch = (p5) => {
        p5.setup = () => {
            _p5 = p5;
            p5.createCanvas(screenSize, screenSize);
        };

        p5.draw = () => {
            p5.background(0);
            drawGrid(p5, grid);

            p5.noLoop();
        };
    };

    onDestroy(() => {
        _p5?.remove();
    });
</script>

<h3>Grid generator</h3>
<P5 {sketch} />
