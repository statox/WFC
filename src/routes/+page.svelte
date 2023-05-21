<script>
    import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
    import TileEditor from '$lib/components/TileEditor.svelte';
    import ConnectionsEditor from '$lib/components/ConnectionsEditor.svelte';
</script>

<Tabs>
    <TabList>
        <Tab>Tiles</Tab>
        <Tab>Connections</Tab>
    </TabList>

    <TabPanel>
        <TileEditor />
    </TabPanel>
    <TabPanel>
        <ConnectionsEditor />
    </TabPanel>
</Tabs>
