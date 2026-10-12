import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Home } from "lucide-react";

import { getMyPropertiesAction } from "@/app/dashboard/_actions/landlord";
import PropertyManagementActions from "@/app/dashboard/_components/PropertyManagementActions";

interface PropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyPage({
  params,
}: PropertyPageProps) {
  const { id } = await params;

  const properties = await getMyPropertiesAction();

  const property = properties.find(
    (item: { id: string }) => item.id === id
  );

  if (!property) {
    notFound();
  }

  const location = [property.city, property.country]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Back Button */}
        <Link
          href="/dashboard/landlord/properties"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft size={18} />
          Back to Properties
        </Link>

        {/* Header */}
        <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 text-card-foreground sm:flex-row sm:items-center sm:justify-between">

          <div className="flex min-w-0 items-center gap-4">

            {/* Property Image */}
            <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
              {property.propertyPhoto ? (
                <Image
                  src={property.propertyPhoto}
                  alt={property.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Home size={28} className="text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Title & Location */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-2xl font-bold text-foreground">
                  {property.title}
                </h1>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    property.availability === "AVAILABLE"
                      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {property.availability === "AVAILABLE"
                    ? "Available"
                    : "Unavailable"}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={16} className="shrink-0" />
                <span className="truncate">
                  {location || "Location not available"}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <PropertyManagementActions property={property} />
        </div>

        {/* Property Information */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">

          {/* Main Information */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6 text-card-foreground">

              <h2 className="text-lg font-semibold text-foreground">
                Property Details
              </h2>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">

                <div>
                  <p className="text-sm text-muted-foreground">
                    Monthly Rent
                  </p>

                  <p className="mt-1 text-2xl font-bold text-foreground">
                    ৳ {property.rentPrice?.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Category
                  </p>

                  <p className="mt-1 font-semibold text-foreground">
                    {property.category?.name || "Not specified"}
                  </p>
                </div>

              </div>

              {/* Description */}
              <div className="mt-8 border-t border-border pt-6">
                <h3 className="font-semibold text-foreground">
                  Description
                </h3>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {property.description || "No description available."}
                </p>
              </div>

            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="rounded-2xl border border-border bg-card p-6 text-card-foreground">

              <h2 className="text-lg font-semibold text-foreground">
                Property Status
              </h2>

              <div className="mt-5 flex items-center justify-between">

                <span className="text-sm text-muted-foreground">
                  Availability
                </span>

                <span
                  className={`flex items-center gap-2 text-sm font-medium ${
                    property.availability === "AVAILABLE"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-muted-foreground"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      property.availability === "AVAILABLE"
                        ? "bg-emerald-500"
                        : "bg-muted-foreground"
                    }`}
                  />

                  {property.availability === "AVAILABLE"
                    ? "Available"
                    : "Unavailable"}
                </span>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}