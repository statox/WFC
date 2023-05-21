<script>
    import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
    import TileEditor from '$lib/components/TileEditor.svelte';
</script>

<Tabs>
    <TabList>
        <Tab>Tile Editor</Tab>
    </TabList>

    <TabPanel>
        <TileEditor />
    </TabPanel>
</Tabs>
