
"use client";

import { LandlordProperty } from "@/types/landlord";
import PropertyCard from "./PropertyCard";

interface PropertyListProps {
    properties: LandlordProperty[];
}

export default function PropertyList({
    properties,
}: PropertyListProps) {
    if (!properties?.length) {
        return (
            <div className="rounded-lg border border-border bg-card p-10 text-center text-muted-foreground">
                No properties found.
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
                <PropertyCard
                    key={property.id}
                    property={property}
                />
            ))}
        </div>
    );
}