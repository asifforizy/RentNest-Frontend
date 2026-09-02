"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { MapPin, Pencil, Trash2, Home, ArrowRight } from "lucide-react";

import type { LandlordProperty } from "@/types/landlord";
import { deletePropertyAction } from "../_actions/landlord";
import Image from "next/image";

interface PropertyCardProps {
  property: LandlordProperty;
  variant?: "full" | "compact";
}

const RENTAL_STATUS_STYLES: Record<
  "AVAILABLE" | "UNAVAILABLE",
  { dot: string; label: string; stripe: string }
> = {
  AVAILABLE: { dot: "bg-emerald-400", label: "Available", stripe: "bg-emerald-500" },
  UNAVAILABLE: { dot: "bg-neutral-400", label: "Unavailable", stripe: "bg-neutral-500" },
};

export default function PropertyCard({
  property,
  variant = "full",
}: PropertyCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const rentalStatus =
    RENTAL_STATUS_STYLES[property.availability ?? "AVAILABLE"] ??
    RENTAL_STATUS_STYLES.AVAILABLE;

  const location = [property.city, property.country].filter(Boolean).join(", ");

  const hasValidPhoto =
    !!property.propertyPhoto &&
    (property.propertyPhoto.startsWith("http://") ||
      property.propertyPhoto.startsWith("https://") ||
      property.propertyPhoto.startsWith("/")) &&
    !imgFailed;

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete this property? This can't be undone."
    );
    if (!confirmed) return;

    try {
      setLoading(true);
      await deletePropertyAction(property.id);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Couldn't delete this property. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="group relative flex overflow-hidden rounded-xl border border-neutral-200 bg-white transition-colors duration-200 hover:border-neutral-300">

      <div className={`w-1 shrink-0 ${rentalStatus.stripe}`} aria-hidden="true" />

      <div className="flex min-w-0 flex-1 flex-col">

        <div
          className={`relative w-full shrink-0 overflow-hidden bg-neutral-100 ${variant === "compact" ? "h-40" : "h-60"
            }`}
        >
          {hasValidPhoto ? (
            <Image
            unoptimized
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={property.propertyPhoto!}
              alt={property.title}
              onError={() => setImgFailed(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Home size={40} className="text-neutral-300" />
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <div className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${rentalStatus.dot}`} />
              <span className="text-xs font-medium text-white">
                {rentalStatus.label}
              </span>
            </div>

            {property.category && (
              <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-neutral-800">
                {property.category.name}
              </span>
            )}
          </div>

          <div className="absolute inset-x-0 bottom-0 p-4">
            <h2 className="truncate text-lg font-semibold leading-tight text-white">
              {property.title}
            </h2>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-white/75">
              <MapPin size={14} className="shrink-0" />
              <span className="truncate">
                {location || "Location not available"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-neutral-100 px-4 py-3">
          <div>
            <p className="text-[11px] font-medium text-neutral-400">
              Monthly rent
            </p>
            <p className="mt-0.5 text-xl font-semibold tabular-nums text-neutral-900">
              ৳ {property.rentPrice?.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            {variant === "compact" ? (
              <Link
                href={`/dashboard/landlord/properties/${property.id}`}
                className="flex items-center gap-1 text-sm font-medium text-neutral-700 transition hover:text-neutral-900"
              >
                Manage
                <ArrowRight size={16} />
              </Link>
            ) : (
              <>
                <Link
                  href={`/dashboard/landlord/properties/${property.id}/edit`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
                  title="Edit property"
                >
                  <Pencil size={16} />
                </Link>

                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                  title="Delete property"
                >
                  <Trash2 size={16} />
                  {loading ? "Deleting…" : "Delete"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}