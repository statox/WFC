<script lang="ts">
    import {
        collapseBestCell,
        drawGrid,
        getNewGrid,
        removeImpossibleStates
    } from '$lib/services/grid';
    import { connections } from '$lib/stores/connections';
    import { tiles } from '$lib/stores/tiles';
    import type p5 from 'p5';
    import P5, { type Sketch } from 'p5-svelte';
    import { onDestroy } from 'svelte';
    import type { Grid } from '../types/types';

    const screenSize = 500;
    const gridSize = 10;
    let grid: Grid;
    const reset = () => {
        grid = getNewGrid($tiles, gridSize);
        _p5?.loop();
    };

    let _p5: p5;

    const sketch: Sketch = (p5) => {
        p5.setup = () => {
            _p5 = p5;
            p5.createCanvas(screenSize, screenSize);
            reset();
        };

        p5.draw = () => {
            p5.background(0);
            drawGrid(p5, grid);

            p5.noLoop();
        };
    };

    const step = () => {
        removeImpossibleStates(grid, $connections);
        collapseBestCell(grid, $tiles);
        _p5.loop();
    };

    onDestroy(() => {
        _p5?.remove();
    });
</script>

<h3>Grid generator</h3>
<P5 {sketch} />
<button on:click={step}>Step</button>
<button on:click={reset}>Reset</button>
