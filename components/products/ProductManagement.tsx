"use client"

import { useState } from 'react'
import { ProductHeader } from "./ProductHeader"
import { ProductStats } from "./ProductStats"
import { ProductTabs } from "./ProductTabs"
import { ProductTable } from "./ProductTable"
import { Product } from "@/types/interface"
import { Separator } from '../ui/separator'

export default function ProductManagement() {
    const [selectedTab, setSelectedTab] = useState("All")

    const products: Product[] = [
        {
            id: "1",
            name: "iPhone 15 Pro",
            sku: "IPH-15-PRO-256",
            category: "Electronics",
            status: "Active",
            inventory: 45,
            salesChannels: "Online Store, POS",
            markets: "US, CA, UK",
            b2bCatalogs: "Retail",
            type: "Physical",
            vendor: "Apple",
            image: "📱"
        },
        {
            id: "2",
            name: "MacBook Pro 16\"",
            sku: "MBP-16-M3-512",
            category: "Electronics",
            status: "Active",
            inventory: 23,
            salesChannels: "Online Store",
            markets: "US, UK",
            b2bCatalogs: "Wholesale, Retail",
            type: "Physical",
            vendor: "Apple",
            image: "💻"
        },
        {
            id: "3",
            name: "Sony WH-1000XM5",
            sku: "SNY-WH1000XM5",
            category: "Electronics",
            status: "Active",
            inventory: 67,
            salesChannels: "Online Store, POS",
            markets: "US, CA, UK, AU",
            b2bCatalogs: "Retail",
            type: "Physical",
            vendor: "Sony",
            image: "🎧"
        },
        {
            id: "4",
            name: "Apple Watch Series 9",
            sku: "AW-S9-GPS-45",
            category: "Electronics",
            status: "Active",
            inventory: 89,
            salesChannels: "Online Store, POS",
            markets: "US, CA",
            b2bCatalogs: "-",
            type: "Physical",
            vendor: "Apple",
            image: "⌚"
        },
        {
            id: "5",
            name: "Logitech MX Keys",
            sku: "LOG-MXKEYS-BLK",
            category: "Electronics",
            status: "Active",
            inventory: 124,
            salesChannels: "Online Store",
            markets: "US, UK",
            b2bCatalogs: "Wholesale",
            type: "Physical",
            vendor: "Logitech",
            image: "⌨️"
        },
        {
            id: "6",
            name: "Samsung Galaxy S24",
            sku: "SAM-S24-256-BLK",
            category: "Electronics",
            status: "Draft",
            inventory: 0,
            salesChannels: "-",
            markets: "-",
            b2bCatalogs: "-",
            type: "Physical",
            vendor: "Samsung",
            image: "📱"
        },
    ]

    const filteredProducts = selectedTab === "All"
        ? products
        : products.filter(product => product.status === selectedTab)

    return (
        <div className="min-h-screen mainCardBg">
            <ProductHeader />
            <Separator className='my-1'/>
            <ProductStats />
            <ProductTabs
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
            />
            <ProductTable products={filteredProducts} />

        </div>
    )
}