
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

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      await updatePropertyAction(
        property.id,
        formData as Partial<CreatePropertyInput>
      );

      toast.success("Property updated successfully");

      router.push(
        `/dashboard/landlord/properties/${property.id}`
      );

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
      className="rounded-2xl border border-gray-200 bg-white p-6"
    >

      <div className="grid gap-6">

        {/* Title */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Property Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="mt-2 w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
          />
        </div>

        {/* Rent Price */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Monthly Rent
          </label>

          <input
            type="number"
            name="rentPrice"
            value={formData.rentPrice}
            onChange={handleChange}
            required
            min="0"
            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
          />
        </div>

        {/* Location */}
        <div className="grid gap-5 sm:grid-cols-2">

          <div>
            <label className="text-sm font-medium text-gray-700">
              City
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Country
            </label>

            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
            />
          </div>

        </div>

        {/* Image */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Property Image URL
          </label>

          <input
            type="text"
            name="propertyPhoto"
            value={formData.propertyPhoto}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
          />
        </div>

        {/* Availability */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Availability
          </label>

          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
          >
            <option value="AVAILABLE">
              Available
            </option>

            <option value="UNAVAILABLE">
              Unavailable
            </option>
          </select>
        </div>

      </div>

      {/* Buttons */}
      <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">

        <Link
          href={`/dashboard/landlord/properties/${property.id}`}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <ArrowLeft size={17} />
          Cancel
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2
                size={17}
                className="animate-spin"
              />

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
