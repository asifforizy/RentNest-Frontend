"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";

import type { LandlordProperty } from "@/types/landlord";

interface PropertyCardProps {
  property: LandlordProperty;
}

const RENTAL_STATUS_STYLES: Record<
  "AVAILABLE" | "UNAVAILABLE",
  {
    dot: string;
    badge: string;
    label: string;
  }
> = {
  AVAILABLE: {
    dot: "bg-emerald-500",
    badge:
      "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    label: "Available",
  },
  UNAVAILABLE: {
    dot: "bg-muted-foreground",
    badge: "bg-muted text-muted-foreground",
    label: "Unavailable",
  },
};

export default function PropertyCard({
  property,
}: PropertyCardProps) {
  const [imgFailed, setImgFailed] = useState(false);

  const rentalStatus =
    RENTAL_STATUS_STYLES[property.availability ?? "AVAILABLE"] ??
    RENTAL_STATUS_STYLES.AVAILABLE;

  const location = [property.city, property.country]
    .filter(Boolean)
    .join(", ");

  const propertyUrl = `/dashboard/landlord/properties/${property.id}`;

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card text-card-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={propertyUrl}
        className="block"
        aria-label={`View ${property.title}`}
      >
        <div className="relative h-44 overflow-hidden bg-muted">
          {!imgFailed && property.propertyPhoto ? (
            <Image
              src={property.propertyPhoto}
              alt={property.title}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 33vw"
              onError={() => setImgFailed(true)}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No image available
            </div>
          )}

          <div className="absolute left-4 top-4">
            <div
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-sm ${rentalStatus.badge}`}
            >
              <span
                className={`h-2 w-2 rounded-full ${rentalStatus.dot}`}
              />
              {rentalStatus.label}
            </div>
          </div>

          {property.category && (
            <div className="absolute right-4 top-4">
              <span className="rounded-full border border-border/50 bg-card/90 px-3 py-1.5 text-xs font-medium text-card-foreground backdrop-blur-sm">
                {property.category.name}
              </span>
            </div>
          )}
        </div>

        <div className="p-5">
          <h2 className="truncate text-lg font-semibold text-card-foreground transition-colors group-hover:text-primary">
            {property.title}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={16} className="shrink-0" />

            <span className="truncate">
              {location || "Location not available"}
            </span>
          </div>

          <div className="my-5 border-t border-border" />

          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Monthly Rent
              </p>

              <p className="mt-1 truncate text-xl font-bold text-card-foreground">
                ৳ {property.rentPrice?.toLocaleString() ?? "N/A"}
              </p>
            </div>

            <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-primary">
              View details
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
