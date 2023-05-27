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
    let prevGrid: Grid;
    let grid: Grid;
    let error = false;

    const reset = () => {
        error = false;
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
            if (error) {
                return;
            }
            p5.background(0);
            try {
                drawGrid(p5, grid);
            } catch {
                drawGrid(p5, prevGrid);
            }

            p5.noLoop();
        };
    };

    const step = () => {
        prevGrid = { ...grid };
        removeImpossibleStates(grid, $connections);
        collapseBestCell(grid, $tiles);
        _p5.loop();
    };

    const completeProcess = () => {
        try {
            step();
            setTimeout(completeProcess, 10);
        } catch {
            error = true;
        }
    };

    onDestroy(() => {
        _p5?.remove();
    });
</script>

<h3>Grid generator</h3>
<P5 {sketch} />
{#if error}
    <div>Can't continue collapsing</div>
{/if}
<button on:click={completeProcess}>Collapse</button>
<button on:click={step}>Step</button>
<button on:click={reset}>Reset</button>
