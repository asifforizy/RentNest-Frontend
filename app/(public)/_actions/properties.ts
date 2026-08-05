import { Property } from "@/types/property";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

export const getAllProperties = async (): Promise<Property[]> => {
  const response = await fetch( `${BACKEND_API_URL}/api/properties`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }

  const data = await response.json();

  return data.data;
};