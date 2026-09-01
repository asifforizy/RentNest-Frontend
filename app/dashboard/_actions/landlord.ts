"use server";

import { cookies } from "next/headers";
import { CreatePropertyInput, RequestStatus } from "@/types/landlord";

const API_URL = process.env.BACKEND_API_URL;

async function getAuthHeaders() {
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken")?.value;

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getMyPropertiesAction() {
  try {
    const headers = await getAuthHeaders();

    const response = await fetch(`${API_URL}/api/landlord/my-properties`, {
      headers,
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch properties");
    }

    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function createPropertyAction(data: CreatePropertyInput) {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_URL}/api/landlord/properties`, {
    method: "POST",

    headers,

    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create property");
  }

  return result.data;
}

export async function updatePropertyAction(
  id: string,
  data: Partial<CreatePropertyInput>
) {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_URL}/api/landlord/properties/${id}`, {
    method: "PUT",

    headers,

    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update property");
  }

  return result.data;
}

export async function deletePropertyAction(id: string) {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_URL}/api/landlord/properties/${id}`, {
    method: "DELETE",
    headers,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete property");
  }

  return result.data;
}

export async function getLandlordRequestsAction() {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_URL}/api/landlord/requests`, {
    headers,
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch rental requests");
  }

  return result.data;
}

export async function updateRentalRequestAction(
  id: string,
  status: RequestStatus
) {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_URL}/api/landlord/requests/${id}`, {
    method: "PATCH",

    headers,

    body: JSON.stringify({
      status,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update request");
  }

  return result.data;
}
