import { cookies } from "next/headers";

import type { Rental, RentalsResponse } from "@/types/rental";

import type { Payment, PaymentsResponse } from "@/types/payment";

async function getAuthCookie() {
  const cookieStore = await cookies();

  return cookieStore.toString();
}

export async function getTenantRentals(): Promise<Rental[]> {
  const cookie = await getAuthCookie();

  const response = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
    method: "GET",
    headers: {
      Cookie: cookie,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await response.text();

    console.error("Rentals error:", error);

    throw new Error("Failed to fetch rentals");
  }

  const result: RentalsResponse = await response.json();

  return result.data;
}

export async function getTenantPayments(): Promise<Payment[]> {
  const cookie = await getAuthCookie();

  const response = await fetch(`${process.env.BACKEND_API_URL}/api/payments`, {
    method: "GET",
    headers: {
      Cookie: cookie,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await response.text();

    console.error("Payments error:", error);

    throw new Error("Failed to fetch payments");
  }

  const result: PaymentsResponse = await response.json();

  return result.data;
}
