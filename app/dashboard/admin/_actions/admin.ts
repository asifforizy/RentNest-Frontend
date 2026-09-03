"use server"

import { AdminUsersResponse, UpdateUserData } from "@/types/admin"
import { cookies } from "next/headers"



const API_URL = process.env.BACKEND_API_URL

export async function getAdminUsers(): Promise<AdminUsersResponse> {
  if (!API_URL) {
    throw new Error("BACKEND_API_URL is not configured")
  }

  const cookieStore = await cookies()

  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    throw new Error("Access token not found")
  }

  const response = await fetch(
    `${API_URL}/api/admin/users`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    }
  )

  const result: unknown = await response.json()

  if (!response.ok) {
    if (
      typeof result === "object" &&
      result !== null &&
      "message" in result &&
      typeof result.message === "string"
    ) {
      throw new Error(result.message)
    }

    throw new Error("Failed to fetch users")
  }

  return result as AdminUsersResponse
}

export async function updateUser(
  userId: string,
  data: UpdateUserData
): Promise<void> {
  if (!API_URL) {
    throw new Error("BACKEND_API_URL is not configured")
  }

  const cookieStore = await cookies()

  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    throw new Error("Access token not found")
  }

  const response = await fetch(
    `${API_URL}/api/admin/users/${userId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  )

  const result: unknown = await response.json()

  if (!response.ok) {
    if (
      typeof result === "object" &&
      result !== null &&
      "message" in result &&
      typeof result.message === "string"
    ) {
      throw new Error(result.message)
    }

    throw new Error("Failed to update user")
  }
}