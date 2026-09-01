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
            <div className="border rounded-lg p-10 text-center">
                No properties found.
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {properties.map((property) => (
                <PropertyCard
                    key={property.id}
                    property={property}
                />
            ))}

        </div>
    );
}