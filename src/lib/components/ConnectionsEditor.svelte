<script lang="ts">
    import { connections } from '$lib/connections';
    import { tiles } from '$lib/tiles';
    import TileComponent from './Tile.svelte';
</script>

{#each Object.keys($connections) as tileId}
    {@const tile = $tiles[tileId]}
    <div class="row">
        <TileComponent {tile} />
        {#each Object.keys($connections[tileId]) as direction}
            {@const possibleNeighbors = $connections[tileId][direction]}
            <div>
                {direction}
                {#each possibleNeighbors as neighborId}
                    {@const neighbor = $tiles[neighborId]}
                    <TileComponent tile={neighbor} />
                {/each}
            </div>
        {/each}
    </div>
{/each}

<style>
    .row {
        margin-bottom: 2em;
        border: solid #cfd9e7 2px;
    }
</style>
