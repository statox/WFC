<script>
    import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
    import TileEditor from '$lib/components/TileEditor.svelte';
    import ConnectionsEditor from '$lib/components/ConnectionsEditor.svelte';
    import GridGenerator from '$lib/components/GridGenerator.svelte';

    const tabs = [
        { title: 'Tiles', component: TileEditor },
        { title: 'Connections', component: ConnectionsEditor },
        { title: 'Grid', component: GridGenerator }
    ];
</script>

<Tabs>
    <TabList>
        {#each tabs as tab}
            <Tab>{tab.title}</Tab>
        {/each}
    </TabList>

    {#each tabs as tab}
        <TabPanel>
            <svelte:component this={tab.component} />
        </TabPanel>
    {/each}
</Tabs>
