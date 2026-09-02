
"use client";

import { Rental } from "@/types/rental";
import Image from "next/image";
import Link from "next/link";

interface Props {
    rentals: Rental[];
}

export default function RentalRequests({ rentals }: Props) {
    return (
        <section className="mt-8">
            <div className="mb-4">
                <h2 className="text-xl font-semibold">
                    My Rental Requests
                </h2>

                <p className="text-sm text-muted-foreground">
                    Track your rental requests and their current status.
                </p>
            </div>

            {rentals.length === 0 ? (
                <div className="rounded-xl border bg-card p-6 text-center">
                    <p className="text-muted-foreground">
                        You don't have any rental requests yet.
                    </p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {rentals.map((rental) => (
                        <div
                            key={rental.id}
                            className="overflow-hidden rounded-xl border bg-card shadow-sm"
                        >
                            {/* Property Image */}
                            <div className="relative h-48">
                                <Image
                                    unoptimized
                                    src={
                                        rental.property?.propertyPhoto ||
                                        "/placeholder-property.jpg"
                                    }
                                    alt={
                                        rental.property?.title ||
                                        "Property"
                                    }
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Property Information */}
                            <div className="p-5">
                                <h3 className="text-lg font-semibold">
                                    {rental.property?.title ||
                                        "Unknown Property"}
                                </h3>

                                {rental.property?.rentPrice !== undefined && (
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        ${rental.property.rentPrice} / month
                                    </p>
                                )}

                                {/* Status */}
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        Status
                                    </span>

                                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                                        {rental.status}
                                    </span>
                                </div>

                                {/* Requested Date */}
                                <p className="mt-3 text-xs text-muted-foreground">
                                    Requested{" "}
                                    {new Date(
                                        rental.createdAt
                                    ).toLocaleDateString()}
                                </p>

                                {/* Pay Now */}
                                {rental.status === "APPROVED" && (
                                    <div className="mt-5">
                                        <Link
                                            href={`/dashboard/tenant/requests/${rental.id}/pay`}
                                            className="block w-full rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground transition hover:opacity-90"
                                        >
                                            Pay Now
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

