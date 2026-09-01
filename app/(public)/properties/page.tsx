
import { PropertiesPageProps } from "@/types/property";
import { getAllProperties } from "../_actions/properties";
import PropertyList from "../_components/propertyList";


export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  const params = await searchParams;

  const properties = await getAllProperties({
    search: params.search,
    category: params.category,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    location: params.location,
  });

  return (
    <main className="mx-auto  px-4 py-10 sm:px-6 lg:px-20">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Find Your Perfect Home
        </h1>

        <p className="mt-2 text-muted-foreground">
          Browse available rental properties and find a place that feels
          like home.
        </p>
      </div>


      <div className="mb-6 mt-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Available Properties
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {properties?.length || 0}{" "}
            {properties?.length === 1 ? "property" : "properties"} found
          </p>
        </div>
      </div>

      <PropertyList properties={properties} />
    </main>
  );
}
