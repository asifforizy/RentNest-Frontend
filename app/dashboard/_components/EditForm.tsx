
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { updatePropertyAction } from "@/app/dashboard/_actions/landlord";
import type {
  LandlordProperty,
  CreatePropertyInput,
} from "@/types/landlord";

interface EditPropertyFormProps {
  property: LandlordProperty;
}

export default function EditPropertyForm({
  property,
}: EditPropertyFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: property.title || "",
    description: property.description || "",
    rentPrice: property.rentPrice || 0,
    city: property.city || "",
    country: property.country || "",
    propertyPhoto: property.propertyPhoto || "",
    availability: property.availability || "AVAILABLE",
  });

  const inputClassName =
    "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30";

  const labelClassName = "text-sm font-medium text-foreground";

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "rentPrice" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      await updatePropertyAction(
        property.id,
        formData as Partial<CreatePropertyInput>
      );

      toast.success("Property updated successfully");

      router.push(`/dashboard/landlord/properties/${property.id}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update property");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm"
    >
      <div className="grid gap-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className={labelClassName}>
            Property Title
          </label>

          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={inputClassName}
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className={labelClassName}>
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className={`${inputClassName} resize-none`}
          />
        </div>

        {/* Rent Price */}
        <div>
          <label htmlFor="rentPrice" className={labelClassName}>
            Monthly Rent
          </label>

          <input
            id="rentPrice"
            type="number"
            name="rentPrice"
            value={formData.rentPrice}
            onChange={handleChange}
            required
            min="0"
            step="any"
            className={inputClassName}
          />
        </div>

        {/* Location */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="city" className={labelClassName}>
              City
            </label>

            <input
              id="city"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="country" className={labelClassName}>
              Country
            </label>

            <input
              id="country"
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>
        </div>

        {/* Image */}
        <div>
          <label htmlFor="propertyPhoto" className={labelClassName}>
            Property Image URL
          </label>

          <input
            id="propertyPhoto"
            type="url"
            name="propertyPhoto"
            value={formData.propertyPhoto}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className={inputClassName}
          />
        </div>

        {/* Availability */}
        <div>
          <label htmlFor="availability" className={labelClassName}>
            Availability
          </label>

          <select
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className={inputClassName}
          >
            <option value="AVAILABLE">Available</option>
            <option value="UNAVAILABLE">Unavailable</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={`/dashboard/landlord/properties/${property.id}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <ArrowLeft size={17} />
          Cancel
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <Save size={17} />
              Save Changes
            </>
          )}
        </button>
      </div>
    </form>
  );
}