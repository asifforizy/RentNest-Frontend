import { cookies } from "next/headers";


import { RentalRequest } from "@/types/landlord";
import RentalRequestList from "../../_components/RentalRequestsList";
import Link from "next/link";

export default async function RentalRequestsPage() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const response = await fetch(
        `${process.env.BACKEND_API_URL}/api/landlord/requests`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    );

    const result = await response.json();

    console.log("Rental requests API response:", result);

    if (!response.ok) {
        throw new Error(
            result?.message || "Failed to fetch rental requests"
        );
    }

    const requests: RentalRequest[] = result.data;

    return (
        <div className="mx-auto max-w-6xl mt-7 px-5 pb-10 ">
            <Link
                href="/dashboard/landlord"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground mb-4"
            >
                ← Back to rental requests
            </Link>

            <RentalRequestList requests={requests} />
        </div>
    );
}