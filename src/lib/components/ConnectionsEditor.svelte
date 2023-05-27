<script lang="ts">
    import { connections } from '$lib/stores/connections';
    import { tiles } from '$lib/stores/tiles';
    import TileComponent from './Tile.svelte';
    import ConnectionComponent from './Connection.svelte';

    const getTileIds = () => {
        return Object.keys($connections).map(Number);
    };
</script>

{#each getTileIds() as tileId}
    {@const tile = $tiles[tileId]}
    <div class="row">
        <TileComponent {tile} />

        {#if $connections[tileId]['N']}
            <span>North</span>
            <div class="subrow">
                {#each $connections[tileId]['N'] || [] as neighborId}
                    {@const neighbor = $tiles[neighborId]}
                    <ConnectionComponent tile1={neighbor} tile2={tile} direction="N" />
                {/each}
            </div>
        {/if}

        {#if $connections[tileId]['E']}
            <span>East</span>
            <div class="subrow">
                {#each $connections[tileId]['E'] || [] as neighborId}
                    {@const neighbor = $tiles[neighborId]}
                    <ConnectionComponent tile1={tile} tile2={neighbor} direction="E" />
                {/each}
            </div>
        {/if}

        {#if $connections[tileId]['S']}
            <span>South</span>
            <div class="subrow">
                {#each $connections[tileId]['S'] || [] as neighborId}
                    {@const neighbor = $tiles[neighborId]}
                    <ConnectionComponent tile1={tile} tile2={neighbor} direction="S" />
                {/each}
            </div>
        {/if}

        {#if $connections[tileId]['W']}
            <span>West</span>
            <div class="subrow">
                {#each $connections[tileId]['W'] || [] as neighborId}
                    {@const neighbor = $tiles[neighborId]}
                    <ConnectionComponent tile1={neighbor} tile2={tile} direction="W" />
                {/each}
            </div>
        {/if}
    </div>
{/each}

<style>
    .row {
        margin-bottom: 2em;
        border: solid #cfd9e7 2px;
    }

    .subrow {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        column-gap: 3em;
    }
</style>
