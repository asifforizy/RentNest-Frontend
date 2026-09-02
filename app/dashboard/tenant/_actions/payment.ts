"use server";

import { cookies } from "next/headers";

export async function createCheckoutSessionAction(
    rentalRequestId: string
) {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        throw new Error("You are not logged in. Please log in.");
    }

    const response = await fetch(
        `${process.env.BACKEND_API_URL}/api/payments/create`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                rentalRequestId,
            }),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result?.message || "Failed to create checkout session"
        );
    }

    return result.data;
}