import Link from "next/link";
import {
  Building2,
  Inbox,
  Plus,
  ArrowRight,
} from "lucide-react";

import {
  getMyPropertiesAction,
  getMyRentalRequestsAction,
} from "../_actions/landlord";

import type { LandlordProperty } from "@/types/landlord";
import PropertyCard from "../_components/PropertyCard";

export default async function LandlordDashboardPage() {
  const properties = await getMyPropertiesAction();
  const rentalRequests = await getMyRentalRequestsAction();

  const totalProperties = properties?.length || 0;
  const totalRequests = rentalRequests?.length || 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Landlord Dashboard
            </h1>

            <p className="mt-2 text-muted-foreground">
              Manage your properties and rental requests in one place.
            </p>
          </div>

          <Link
            href="/dashboard/landlord/properties/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Plus size={20} />
            Add Property
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-5 sm:grid-cols-2">

          {/* Total Properties */}
          <Link
            href="/dashboard/landlord/properties"
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Properties
                </p>

                <h2 className="mt-3 text-3xl font-bold text-card-foreground">
                  {totalProperties}
                </h2>

                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                  View all
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>

              <div className="rounded-xl bg-muted p-3">
                <Building2
                  size={22}
                  className="text-muted-foreground"
                />
              </div>
            </div>
          </Link>

          {/* Rental Requests */}
          <Link
            href="/dashboard/landlord/requests"
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Rental Requests
                </p>

                <h2 className="mt-3 text-3xl font-bold text-card-foreground">
                  {totalRequests}
                </h2>

                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                  Manage requests
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>

              <div className="rounded-xl bg-muted p-3">
                <Inbox
                  size={22}
                  className="text-muted-foreground"
                />
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Properties */}
        <div className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Recent Properties
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Your latest property listings.
              </p>
            </div>

            <Link
              href="/dashboard/landlord/properties"
              className="hidden items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground transition-colors hover:bg-muted sm:flex"
            >
              View All Properties
              <ArrowRight size={16} />
            </Link>
          </div>

          {properties?.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {properties.slice(0, 3).map(
                (property: LandlordProperty) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                  />
                )
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-card py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                <Building2
                  size={26}
                  className="text-muted-foreground"
                />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-card-foreground">
                No properties yet
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                Start growing your rental business by adding
                your first property.
              </p>

              <Link
                href="/dashboard/landlord/properties/new"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Plus size={18} />
                Add Your First Property
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}