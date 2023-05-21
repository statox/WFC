<script lang="ts">
    import type p5 from 'p5';
    import P5, { type Sketch } from 'p5-svelte';
    import { onDestroy } from 'svelte';
    import type { Tile } from './types';

    export let tile: Tile;
    export let screenSize = 100;
    let _p5: p5;

    const scale = screenSize / tile.size;

    const sketch: Sketch = (p5) => {
        p5.setup = () => {
            _p5 = p5;
            p5.createCanvas(screenSize, screenSize);
        };

        p5.draw = () => {
            tile.pixels.forEach((color, index) => {
                const x = index % tile.size;
                const y = Math.floor(index / tile.size);
                p5.fill(color * 255);
                p5.rect(x * scale, y * scale, scale, scale);
            });

            p5.noLoop();
        };
    };

    onDestroy(() => {
        _p5?.remove();
    });
</script>

<P5 {sketch} />
