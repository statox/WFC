<script>
    import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
    import TileEditor from './components/TileEditor.svelte';
    import ConnectionsEditor from './components/ConnectionsEditor.svelte';
    import GridGenerator from './components/GridGenerator.svelte';

    const tabs = [
        { title: 'Grid', component: GridGenerator },
        { title: 'Tiles', component: TileEditor },
        { title: 'Connections', component: ConnectionsEditor }
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
