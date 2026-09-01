import Link from "next/link";
import { ArrowLeft, Building2, Plus } from "lucide-react";

import { getMyPropertiesAction } from "../../_actions/landlord";
import PropertyList from "../../_components/PropertyList";


export default async function MyPropertiesPage() {
  const properties = await getMyPropertiesAction();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <Link
              href="/dashboard/landlord"
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              My Properties
            </h1>

            <p className="mt-2 text-gray-500">
              Manage all your property listings in one place.
            </p>
          </div>

          <Link
            href="/dashboard/landlord/properties/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            <Plus size={18} />
            Add Property
          </Link>

        </div>

        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
              <Building2
                size={24}
                className="text-gray-700"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Properties
              </p>

              <h2 className="text-2xl font-bold text-gray-900">
                {properties.length}
              </h2>
            </div>

          </div>

        </div>

        <PropertyList properties={properties} />

      </div>
    </div>
  );
}