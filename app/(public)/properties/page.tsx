

import { getAllProperties } from "../_actions/properties";
import PropertyList from "../_components/propertyList";


export default async function PropertiesPage() {
  const properties = await getAllProperties();

  return (
     <main className="mx-auto max-w-7xl px-6 py-10">

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">
          All Properties
        </h1>

        <p className="mt-2 text-gray-600">
          Find your perfect rental property
        </p>
      </div>

      <div className="mb-6 mt-8 flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Total Properties: {properties?.length || 0}
        </h3>
      </div>

      <PropertyList properties={properties} />
    </main>
  );
}