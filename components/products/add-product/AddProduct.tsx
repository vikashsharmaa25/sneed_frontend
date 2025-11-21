"use client"

import { ProductHeader } from "./ProductHeader"
import { BasicInfoSection } from "./BasicInfoSection"
import { DescriptionSection } from "./DescriptionSection"
import { MediaSection } from "./MediaSection"
import { PriceSection } from "./PriceSection"
import { InventorySection } from "./InventorySection"
import { SidebarSection } from "./SidebarSection"
import { useState } from "react"
import Shipping from "./Shipping"
import VariantHome from "./variants/VariantHome"
import SearchEngineListing from "./SearchEngineListing"
import AddOns from "./AddOns"

const AddProduct = () => {
    const [status, setStatus] = useState("active")

    return (
        <div className="space-y-2 max-w-4xl mx-auto">
            <ProductHeader />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                {/* Left Column - Main Form */}
                <div className="lg:col-span-2 space-y-2">
                    <BasicInfoSection />
                    <DescriptionSection />
                    <MediaSection />
                    <PriceSection />
                    <InventorySection />
                    <Shipping />
                    <VariantHome />
                    <SearchEngineListing />
                    <AddOns />
                </div>

                {/* Right Column - Sidebar */}
                <SidebarSection />
            </div>
        </div>
    )
}

export default AddProduct
