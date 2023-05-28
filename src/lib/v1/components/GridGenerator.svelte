<script lang="ts">
    import {
        collapseBestCell,
        collapseCell,
        drawGrid,
        getNewGrid,
        removeImpossibleStates
    } from '$lib/v1/services/grid';
    import { connections } from '$lib/v1/stores/connections';
    import { tiles } from '$lib/v1/stores/tiles';
    import type p5 from 'p5';
    import P5, { type Sketch } from 'p5-svelte';
    import { onDestroy } from 'svelte';
    import type { Grid } from '../types/types';

    const screenSize = 500;
    let gridSize = 10;
    let prevGrid: Grid;
    let grid: Grid;
    let error = false;

    const reset = () => {
        error = false;
        grid = getNewGrid($tiles, gridSize);
        const seededCells = Math.floor(Math.random() * 5);
        for (let i = 0; i < seededCells; i++) {
            const randIndex = Math.floor(Math.random() * $tiles.length);
            collapseCell(
                grid,
                {
                    x: Math.floor(Math.random() * gridSize),
                    y: Math.floor(Math.random() * gridSize)
                },
                $tiles[randIndex]
            );
        }
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
            setTimeout(completeProcess, 1);
        } catch {
            error = true;
        }
    };

    const infiniteProcess = () => {
        try {
            step();
            setTimeout(infiniteProcess, 1);
        } catch {
            error = true;
            setTimeout(() => {
                reset();
                infiniteProcess();
            }, 1000);
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
<button on:click={infiniteProcess}>Infinite generation</button>
<button on:click={completeProcess}>Collapse</button>
<button on:click={step}>Step</button>
<button on:click={reset}>Reset</button>

<label for="gridSize">Grid Size</label>
<input type="number" bind:value={gridSize} on:change={reset} min="2" />
