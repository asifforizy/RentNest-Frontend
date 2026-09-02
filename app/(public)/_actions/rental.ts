"use server";

import { CreateRentalRequestInput } from "@/types/tenant";
import { cookies } from "next/headers";



export async function createRentalAction(
    data: CreateRentalRequestInput
) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        throw new Error("You are not logged in. Please log in.");
    }

    const response = await fetch(
        `${process.env.BACKEND_API_URL}/api/rentals`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result?.message || "Failed to submit rental request"
        );
    }

    return result;
}