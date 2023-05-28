<script lang="ts">
    import { drawTileInRect } from '$lib/v1/services/tiles';
    import type p5 from 'p5';
    import P5, { type Sketch } from 'p5-svelte';
    import { onDestroy } from 'svelte';
    import type { Tile } from '../types/types';

    export let tile: Tile;
    export let screenSize = 100;
    let _p5: p5;

    const sketch: Sketch = (p5) => {
        p5.setup = () => {
            _p5 = p5;
            p5.createCanvas(screenSize, screenSize);
        };

        p5.draw = () => {
            drawTileInRect(p5, tile, { x: 0, y: 0, size: screenSize });

            p5.noLoop();
        };
    };

    onDestroy(() => {
        _p5?.remove();
    });
</script>

<P5 {sketch} />
