
import Link from "next/link";
import { ArrowLeft, Building2, Plus } from "lucide-react";

import { getMyPropertiesAction } from "../../_actions/landlord";
import PropertyList from "../../_components/PropertyList";

export default async function MyPropertiesPage() {
  const properties = await getMyPropertiesAction();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/dashboard/landlord"
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              My Properties
            </h1>

            <p className="mt-2 text-muted-foreground">
              Manage all your property listings in one place.
            </p>
          </div>

          <Link
            href="/dashboard/landlord/properties/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Plus size={18} />
            Add Property
          </Link>
        </div>

        <div className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
              <Building2
                size={24}
                className="text-foreground"
              />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total Properties
              </p>

              <h2 className="text-2xl font-bold text-card-foreground">
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
