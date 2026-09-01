
import { Property } from "@/types/property";
import PropertyCard from "./propertyCard";
import { getAllProperties } from "../_actions/properties";
import HeroBanner from "./banner";

export default async function FeaturedProperties() {
  const properties: Property[] = await getAllProperties();

  const featuredProperties = properties.slice(0, 6);

  return (
    <section className="mx-auto  px-4 py-16 sm:px-6 lg:px-20">
      <div className="mb-8">
        <HeroBanner></HeroBanner>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight p-10 text-center">Featured Properties</h1>
      </div>

      {featuredProperties.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((property: Property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <p className="text-muted-foreground">
            No properties available at the moment.
          </p>
        </div>
      )}
    </section>
  );
}