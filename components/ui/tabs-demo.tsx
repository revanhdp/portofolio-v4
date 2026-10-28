"use client";

import { Tabs, TabList, Tab, TabPanel } from "@/components/ui/tabs";

export default function TabsDemo() {
  return (
    <div className="flex w-full min-h-[320px] items-center justify-center bg-background p-8 text-foreground">
      <div className="w-full max-w-sm">
        <Tabs defaultValue="ink" roughness={1.5}>
          <TabList>
            <Tab value="ink">Ink</Tab>
            <Tab value="wash">Wash</Tab>
            <Tab value="paper">Paper</Tab>
          </TabList>
          <TabPanel value="ink">Real HTML under a sketch underline.</TabPanel>
          <TabPanel value="wash">Switching tabs redraws the rule.</TabPanel>
          <TabPanel value="paper">
            Arrow keys, aria-selected, and tab panels come from Radix.
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
