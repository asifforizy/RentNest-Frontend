"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { deletePropertyAction } from "../_actions/landlord";
import { toast } from "sonner";



interface PropertyManagementActionsProps {
  property: {
    id: string;
  };
}

export default function PropertyManagementActions({
  property,
}: PropertyManagementActionsProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      await deletePropertyAction(property.id);

      toast.success("Property deleted successfully");

      router.replace("/dashboard/landlord/properties");
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete property"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-3">

      {/* Edit */}
      <Link
        href={`/dashboard/landlord/properties/${property.id}/edit`}
        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
      >
        <Pencil size={17} />

        Edit Property
      </Link>

      {/* Delete */}
      <button
        onClick={handleDelete}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Trash2 size={17} />

        {loading ? "Deleting..." : "Delete"}
      </button>

    </div>
  );
}