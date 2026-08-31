"use server";

interface PropertyFilters {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  location?: string;
}


export const getAllProperties = async (filters?: PropertyFilters) => {
  const params = new URLSearchParams();

  if (filters?.search) {
    params.set("search", filters.search);
  }

  if (filters?.category) {
    params.set("category", filters.category);
  }

  if (filters?.minPrice) {
    params.set("minPrice", filters.minPrice);
  }

  if (filters?.maxPrice) {
    params.set("maxPrice", filters.maxPrice);
  }

  if (filters?.location) {
    params.set("location", filters.location);
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }

  const result = await res.json();

  return result.data;
};