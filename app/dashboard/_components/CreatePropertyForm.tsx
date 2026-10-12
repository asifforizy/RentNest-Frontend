"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  createPropertyAction,
  getCategoriesAction,
} from "../_actions/landlord";

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

        if (!cancelled) {
          setCategories(data);
        }
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
        if (!cancelled) {
          setCategoriesLoading(false);
        }
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
        error instanceof Error
          ? error.message
          : "Failed to create property"
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClassName =
    "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60";

  const labelClassName =
    "mb-2 block text-sm font-medium text-foreground";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm"
    >
      {/* Property Title */}
      <div>
        <label htmlFor="title" className={labelClassName}>
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
          placeholder="Describe your property..."
          value={formData.description}
          onChange={handleChange}
          rows={5}
          required
          className={`${inputClassName} resize-none`}
        />
      </div>

      {/* Monthly Rent */}
      <div>
        <label htmlFor="rentPrice" className={labelClassName}>
          Monthly Rent
        </label>

        <input
          id="rentPrice"
          name="rentPrice"
          type="number"
          min="0"
          step="any"
          placeholder="25000"
          value={formData.rentPrice}
          onChange={handleChange}
          required
          className={inputClassName}
        />
      </div>

      {/* Location */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className={labelClassName}>
            City
          </label>

          <input
            id="city"
            name="city"
            type="text"
            placeholder="Dhaka"
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
            name="country"
            type="text"
            placeholder="Bangladesh"
            value={formData.country}
            onChange={handleChange}
            className={inputClassName}
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="categoryId" className={labelClassName}>
          Category
        </label>

        <select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
          disabled={categoriesLoading || !!categoriesError}
          className={inputClassName}
        >
          <option value="">
            {categoriesLoading
              ? "Loading categories…"
              : "Select category"}
          </option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {categoriesError && (
          <p className="mt-2 text-sm text-destructive">
            {categoriesError}. Refresh the page to try again.
          </p>
        )}
      </div>

      {/* Property Photo */}
      <div>
        <label htmlFor="propertyPhoto" className={labelClassName}>
          Property Photo URL
        </label>

        <input
          id="propertyPhoto"
          name="propertyPhoto"
          type="url"
          placeholder="https://example.com/property.jpg"
          value={formData.propertyPhoto}
          onChange={handleChange}
          className={inputClassName}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Creating property..." : "Create Property"}
      </button>
    </form>
  );
}