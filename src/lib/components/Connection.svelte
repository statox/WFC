<script lang="ts">
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
            const scale = Math.min(p5.width, p5.height) / tile1.size;

            tile1.pixels.forEach((color, index) => {
                const x = index % tile1.size;
                const y = Math.floor(index / tile1.size);
                if (['W', 'N'].includes(direction)) {
                    p5.fill(color * 200);
                } else {
                    p5.fill(color * 255);
                }
                p5.rect(x * scale, y * scale, scale, scale);
            });

            tile2.pixels.forEach((color, index) => {
                const x = index % tile1.size;
                const y = Math.floor(index / tile1.size);
                if (['W', 'N'].includes(direction)) {
                    p5.fill(color * 255);
                } else {
                    p5.fill(color * 200);
                }

                if (['W', 'E'].includes(direction)) {
                    p5.rect((x + tile1.size) * scale, y * scale, scale, scale);
                } else {
                    p5.rect(x * scale, (y + tile1.size) * scale, scale, scale);
                }
            });

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
