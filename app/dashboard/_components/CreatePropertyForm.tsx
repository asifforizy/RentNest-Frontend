"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createPropertyAction, getCategoriesAction } from "../_actions/landlord";
import type { Category } from "@/types/landlord";

export default function CreatePropertyForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rentPrice: "",
    propertyPhoto: "",
    city: "",
    country: "",
    categoryId: "",
  });

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      try {
        setCategoriesLoading(true);
        setCategoriesError(null);

        const data = await getCategoriesAction();
        if (!cancelled) setCategories(data);
      } catch (error) {
        console.error("Load categories error:", error);
        if (!cancelled) {
          setCategoriesError(
            error instanceof Error
              ? error.message
              : "Couldn't load categories"
          );
        }
      } finally {
        if (!cancelled) setCategoriesLoading(false);
      }
    }

    loadCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.categoryId) {
      toast.error("Choose a category before creating the property.");
      return;
    }

    try {
      setLoading(true);

      await createPropertyAction({
        title: formData.title,
        description: formData.description,
        rentPrice: Number(formData.rentPrice),
        propertyPhoto: formData.propertyPhoto || undefined,
        city: formData.city || undefined,
        country: formData.country || undefined,
        categoryId: formData.categoryId,
      });

      toast.success("Property created successfully.");

      router.push("/dashboard/landlord");
      router.refresh();
    } catch (error) {
      console.error("Create property error:", error);

      toast.error(
        error instanceof Error ? error.message : "Failed to create property"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border bg-white p-6 shadow-sm"
    >
      {/* Title */}
      <div>
        <label htmlFor="title" className="mb-2 block text-sm font-medium">
          Property Title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          placeholder="e.g. Modern 2 Bedroom Apartment"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          placeholder="Describe your property..."
          value={formData.description}
          onChange={handleChange}
          rows={5}
          required
          className="w-full resize-none rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900"
        />
      </div>

      <div>
        <label htmlFor="rentPrice" className="mb-2 block text-sm font-medium">
          Monthly Rent
        </label>

        <input
          id="rentPrice"
          name="rentPrice"
          type="number"
          min="0"
          placeholder="25000"
          value={formData.rentPrice}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className="mb-2 block text-sm font-medium">
            City
          </label>

          <input
            id="city"
            name="city"
            type="text"
            placeholder="Dhaka"
            value={formData.city}
            onChange={handleChange}
            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900"
          />
        </div>

        <div>
          <label htmlFor="country" className="mb-2 block text-sm font-medium">
            Country
          </label>

          <input
            id="country"
            name="country"
            type="text"
            placeholder="Bangladesh"
            value={formData.country}
            onChange={handleChange}
            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900"
          />
        </div>
      </div>

      <div>
        <label htmlFor="categoryId" className="mb-2 block text-sm font-medium">
          Category
        </label>

        <select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
          disabled={categoriesLoading || !!categoriesError}
          className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-900 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400"
        >
          <option value="">
            {categoriesLoading ? "Loading categories…" : "Select category"}
          </option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {categoriesError && (
          <p className="mt-2 text-sm text-red-600">
            {categoriesError}. Refresh the page to try again.
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="propertyPhoto"
          className="mb-2 block text-sm font-medium"
        >
          Property Photo URL
        </label>

        <input
          id="propertyPhoto"
          name="propertyPhoto"
          type="url"
          placeholder="https://example.com/property.jpg"
          value={formData.propertyPhoto}
          onChange={handleChange}
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Creating property..." : "Create Property"}
      </button>
    </form>
  );
}