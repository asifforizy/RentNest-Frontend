"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { MapPin, Pencil, Trash2, Home } from "lucide-react";

import type { LandlordProperty } from "@/types/landlord";
import { deletePropertyAction } from "../_actions/landlord";

interface PropertyCardProps {
  property: LandlordProperty;
}


const STATUS_STYLES: Record<string, { dot: string; label: string; stripe: string }> = {
  AVAILABLE: { dot: "bg-emerald-400", label: "Available", stripe: "bg-emerald-500" },
  RENTED: { dot: "bg-amber-400", label: "Rented", stripe: "bg-amber-500" },
};

export default function PropertyCard({ property }: PropertyCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const status =
    STATUS_STYLES[property.status ?? "AVAILABLE"] ?? STATUS_STYLES.AVAILABLE;

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

      <div className={`w-1 shrink-0 ${status.stripe}`} aria-hidden="true" />

      <div className="flex min-w-0 flex-1 flex-col">

        <div className="relative h-60 w-full shrink-0 overflow-hidden bg-neutral-100">
          {property.image ? (
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Home size={40} className="text-neutral-300" />
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          <div className="absolute left-4 top-4 flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
            <span className="text-xs font-medium text-white">
              {status.label}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-4">
            <h2 className="truncate text-lg font-semibold leading-tight text-white">
              {property.title}
            </h2>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-white/75">
              <MapPin size={14} className="shrink-0" />
              <span className="truncate">
                {property.location || "Location not available"}
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
              ৳ {property.rent?.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
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
          </div>
        </div>
      </div>
    </article>
  );
}