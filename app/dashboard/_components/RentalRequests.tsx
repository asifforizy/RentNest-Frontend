import Link from "next/link";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import type { Rental } from "@/types/rental";

type RentalRequestsProps = {
    rentals: Rental[];
};

export default function RentalRequests({
    rentals,
}: RentalRequestsProps) {
    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Rental Requests</CardTitle>
            </CardHeader>

            <CardContent>
                {rentals.length === 0 ? (
                    <div className="py-10 text-center">
                        <p className="text-muted-foreground">
                            You haven&apos;t made any rental requests yet.
                        </p>

                        <Link
                            href="/properties"
                            className="mt-4 inline-block text-sm font-medium underline"
                        >
                            Browse properties
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {rentals.map((rental) => (
                            <div
                                key={rental.id}
                                className="flex flex-col justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
                            >
                                {/* Property Information */}
                                <div>
                                    <h3 className="font-semibold">
                                        {rental.property?.title ??
                                            "Rental Property"}
                                    </h3>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Requested on{" "}
                                        {new Date(
                                            rental.createdAt
                                        ).toLocaleDateString()}
                                    </p>

                                    {rental.property?.rentPrice !== undefined && (
                                        <p className="mt-1 text-sm font-medium">
                                            ৳{rental.property.rentPrice} / month
                                        </p>
                                    )}
                                </div>

                                {/* Status + Action */}
                                <div className="flex items-center gap-3">
                                    <Badge>
                                        {rental.status}
                                    </Badge>

                                    <Link
                                        href={`/dashboard/tenant/requests/${rental.id}/pay`}
                                        className="rounded-md border px-3 py-2 text-sm font-medium transition hover:bg-muted"
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}