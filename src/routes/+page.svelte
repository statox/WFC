<script>
    import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
    import V1 from '$lib/v1/Main.svelte';

    const tabs = [{ title: 'V1', component: V1 }];
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
