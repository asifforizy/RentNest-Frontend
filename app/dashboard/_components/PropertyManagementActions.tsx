
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deletePropertyAction } from "../_actions/landlord";

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
      router.refresh();
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
    <div className="flex flex-wrap items-center gap-3">
      {/* Edit */}
      <Link
        href={`/dashboard/landlord/properties/${property.id}/edit`}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-primary px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
      >
        <Pencil size={17} />
        Edit Property
      </Link>

      {/* Delete */}
      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Trash2 size={17} />
        {loading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
