"use server";

import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL;

async function getAuthHeaders() {
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken")?.value;

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getMyProfileAction() {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_URL}/api/users/profile`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to fetch profile"
    );
  }

  return result.data;
}

export async function updateProfileAction(data: {
  name?: string;
  phone?: string;
  address?: string;
  profilePhoto?: string;
}) {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_URL}/api/users/profile`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to update profile"
    );
  }

  return result.data;
}