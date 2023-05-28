<script lang="ts">
    import { drawTileInRect } from '$lib/v1/services/tiles';
    import type p5 from 'p5';
    import P5, { type Sketch } from 'p5-svelte';
    import { onDestroy } from 'svelte';
    import type { Direction, Tile } from '../types/types';

    export let tile1: Tile;
    export let tile2: Tile;
    export let direction: Direction;
    export let screenSize = 100;
    let _p5: p5;

    const sketch: Sketch = (p5) => {
        p5.setup = () => {
            _p5 = p5;
            if (['W', 'E'].includes(direction)) {
                p5.createCanvas(2 * screenSize, screenSize);
            } else {
                p5.createCanvas(screenSize, 2 * screenSize);
            }
        };

        p5.draw = () => {
            const size = ['N', 'S'].includes(direction) ? p5.height / 2 : p5.width / 2;
            const tint1 = ['W', 'N'].includes(direction) ? 200 : 255;
            drawTileInRect(p5, tile1, { x: 0, y: 0, size }, tint1);

            const tint2 = ['W', 'N'].includes(direction) ? 255 : 200;
            const offset = ['N', 'S'].includes(direction)
                ? { x: 0, y: p5.height / 2 }
                : { x: p5.width / 2, y: 0 };
            drawTileInRect(p5, tile2, { ...offset, size }, tint2);

            p5.stroke('red');
            if (['W', 'E'].includes(direction)) {
                p5.line(p5.width / 2, 0, p5.width / 2, p5.height);
            } else {
                p5.line(0, p5.height / 2, p5.width, p5.height / 2);
            }

            p5.noLoop();
        };
    };

    onDestroy(() => {
        _p5?.remove();
    });
</script>

<P5 {sketch} />
