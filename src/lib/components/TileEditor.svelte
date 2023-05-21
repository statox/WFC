<script lang="ts">
    import { deleteTiles, tiles } from '$lib/tiles';
    import type p5 from 'p5';
    import P5, { type Sketch } from 'p5-svelte';
    import { onDestroy } from 'svelte';
    import TileComponent from './Tile.svelte';

    let _p5: p5;

    type TileTmp = {
        size: number;
        pixels: number[];
    };

    const SIZE = 5;
    const tile: TileTmp = {
        size: SIZE,
        pixels: new Array(SIZE * SIZE).fill(0).map((n) => (Math.random() < 0.5 ? 0 : 1))
    };

    const screenSize = 500;
    const scale = screenSize / tile.size;

    const togglePixel = (x: number, y: number) => {
        const index = tile.size * y + x;
        tile.pixels[index] = tile.pixels[index] === 0 ? 1 : 0;
    };
    const fillPixels = (color: number) => {
        tile.pixels = tile.pixels.map((_) => color);
    };
    const saveTile = () => {
        const newTile = {
            id: $tiles.length,
            ...tile
        };
        tiles.set([...$tiles, newTile]);
    };

    const sketch: Sketch = (p5) => {
        p5.setup = () => {
            _p5 = p5;
            p5.createCanvas(screenSize, screenSize);
        };
        let lastClick = 0;
        p5.draw = () => {
            tile.pixels.forEach((color, index) => {
                const x = index % tile.size;
                const y = Math.floor(index / tile.size);
                p5.fill(color * 255);
                p5.rect(x * scale, y * scale, scale, scale);
            });

            if (p5.mouseIsPressed) {
                const now = Date.now();
                if (now - lastClick > 300) {
                    lastClick = now;
                    togglePixel(Math.floor(p5.mouseX / scale), Math.floor(p5.mouseY / scale));
                }
            }
        };
    };

    onDestroy(() => {
        _p5?.remove();
    });
</script>

<P5 {sketch} />
<button on:click={() => fillPixels(1)}>Fill tile</button>
<button on:click={() => fillPixels(0)}>Empty tile</button>

<button on:click={saveTile}>Save tile</button>

<button on:click={deleteTiles}>Reset all tiles</button>
{#each $tiles as tile}
    <TileComponent {tile} screenSize={200} />
{/each}
