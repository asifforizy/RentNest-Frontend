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
    badge: "bg-emerald-50 text-emerald-700",
    label: "Available",
  },
  UNAVAILABLE: {
    dot: "bg-neutral-400",
    badge: "bg-neutral-100 text-neutral-600",
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
    <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg">

      <Link href={propertyUrl} className="block">
        <div className="relative h-44 overflow-hidden bg-neutral-100">
          {!imgFailed && (
            <Image
              src={property.propertyPhoto as string}
              alt={property.title}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 33vw"
              onError={() => setImgFailed(true)}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
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

          {/* Category */}
          {property.category && (
            <div className="absolute right-4 top-4">
              <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-neutral-700 backdrop-blur-sm">
                {property.category.name}
              </span>
            </div>
          )}
        </div>


        <div className="p-5">
          <Link href={propertyUrl}>
            <h2 className="truncate text-lg font-semibold text-neutral-900 transition hover:text-neutral-600">
              {property.title}
            </h2>
          </Link>

          <div className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
            <MapPin size={16} className="shrink-0" />

            <span className="truncate">
              {location || "Location not available"}
            </span>
          </div>

          <div className="my-5 border-t border-neutral-100" />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                Monthly Rent
              </p>

              <p className="mt-1 text-xl font-bold text-neutral-900">
                ৳ {property.rentPrice?.toLocaleString()}
              </p>
            </div>

            <Link
              href={propertyUrl}>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-gray-600 group-hover:text-gray-900">
                View all
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </div>
            </Link>
          </div>
        </div>
      </Link>
    </article>
  );
}


