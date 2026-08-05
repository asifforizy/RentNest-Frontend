import { Property, PropertyListProps } from "@/types/property";
import PropertyCard from "./propertyCard";




export default function PropertyList({properties}: PropertyListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
        />
      ))}
    </div>
  );
}