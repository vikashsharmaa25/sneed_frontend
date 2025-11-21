"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProductTabsProps {
    selectedTab: string
    onTabChange: (value: string) => void
}

export const ProductTabs = ({ selectedTab, onTabChange }: ProductTabsProps) => {
    const tabs = ["All", "Active", "Draft", "Archived"]

    return (
        <Tabs value={selectedTab} onValueChange={onTabChange}>
            <TabsList>
                {tabs.map((tab) => (
                    <TabsTrigger key={tab} value={tab}>
                        {tab}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}
