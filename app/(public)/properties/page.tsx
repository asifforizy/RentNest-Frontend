import { Suspense } from "react";
import { getAllProperties } from "../_actions/properties";
import PropertyList from "../_components/propertyList";
import SearchBox from "../_components/propertySearch";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

  const all = await getAllProperties();

  const term = q.toLowerCase();
  const properties = term
    ? all?.filter((p: any) =>
        [p.title, p.location, p.address, p.description]
          .filter(Boolean)
          .some((field: string) => field.toLowerCase().includes(term))
      )
    : all;

  return (
    <main className="mx-auto px-4 py-10 sm:px-6 lg:px-20">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Find Your Perfect Home
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse available rental properties and find a place that feels like home.
        </p>
      </div>

      <div className="mb-6 mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-xl font-semibold">Available Properties</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {properties?.length || 0}{" "}
            {properties?.length === 1 ? "property" : "properties"} found
            {q && <> for "{q}"</>}
          </p>
        </div>

        <div className="w-full sm:max-w-xs md:max-w-sm">
          <Suspense>
            <SearchBox />
          </Suspense>
        </div>
      </div>

      <PropertyList properties={properties} />
    </main>
  );
}
