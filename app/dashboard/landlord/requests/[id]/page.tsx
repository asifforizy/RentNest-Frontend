import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import { RentalRequest } from "@/types/landlord";

import RequestStatusManager from "@/app/dashboard/_components/RentalStatusManager";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function RentalRequestDetailsPage({
    params,
}: Props) {
    const { id } = await params;

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

    if (!response.ok) {
        throw new Error(
            result?.message || "Failed to fetch rental requests"
        );
    }

    const request = result.data.find(
        (item: RentalRequest) => item.id === id
    );

    if (!request) {
        notFound();
    }

    return (
        <div className="mx-auto max-w-6xl space-y-6">
            <Link
                href="/dashboard/landlord/requests"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
                ← Back to rental requests
            </Link>

            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Rental Request
                </h1>

                <p className="mt-2 text-sm text-muted-foreground">
                    Review the request and manage the rental status.
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                <div className="relative h-80 w-full bg-muted">
                    <Image
                        src={
                            request.property?.propertyPhoto ||
                            "/placeholder-property.jpg"
                        }
                        alt={
                            request.property?.title ||
                            "Property"
                        }
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 1200px"
                        className="object-cover"
                    />

                    <div className="absolute left-6 top-6">
                        <StatusBadge status={request.status} />
                    </div>
                </div>

                <div className="grid gap-8 p-6 md:grid-cols-2">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Property
                        </p>

                        <h2 className="mt-2 text-2xl font-bold">
                            {request.property?.title ||
                                "Unknown property"}
                        </h2>

                        <p className="mt-2 text-sm text-muted-foreground">
                            {request.property?.city ||
                                "Unknown city"}

                            {request.property?.country
                                ? `, ${request.property.country}`
                                : ""}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Tenant
                        </p>

                        <div className="mt-3 flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted text-lg font-bold">
                                {request.tenant?.name
                                    ?.charAt(0)
                                    .toUpperCase() || "T"}
                            </div>

                            <div>
                                <h2 className="font-semibold">
                                    {request.tenant?.name ||
                                        "Unknown tenant"}
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    {request.tenant?.email ||
                                        "No email available"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                    <h2 className="text-lg font-semibold">
                        Request Information
                    </h2>

                    <div className="mt-6 space-y-5">
                        <InfoRow
                            label="Request ID"
                            value={request.id}
                        />

                        <InfoRow
                            label="Property"
                            value={
                                request.property?.title ||
                                "Unknown property"
                            }
                        />

                        <InfoRow
                            label="Tenant"
                            value={
                                request.tenant?.name ||
                                "Unknown tenant"
                            }
                        />

                        <InfoRow
                            label="Email"
                            value={
                                request.tenant?.email ||
                                "No email available"
                            }
                        />

                        <InfoRow
                            label="Move-in Date"
                            value={
                                request.moveInDate ||
                                "Not specified"
                            }
                        />

                        <InfoRow
                            label="Requested"
                            value={formatDate(
                                request.createdAt
                            )}
                        />

                        <div className="flex items-center justify-between border-b pb-5">
                            <span className="text-sm text-muted-foreground">
                                Status
                            </span>

                            <StatusBadge
                                status={request.status}
                            />
                        </div>
                    </div>
                </div>

                <RequestStatusManager
                    requestId={request.id}
                    currentStatus={request.status}
                />
            </div>
        </div>
    );
}

function InfoRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center justify-between gap-4 border-b pb-5">
            <span className="text-sm text-muted-foreground">
                {label}
            </span>

            <span className="max-w-[300px] truncate text-right text-sm font-medium">
                {value}
            </span>
        </div>
    );
}

function StatusBadge({
    status,
}: {
    status: RentalRequest["status"];
}) {
    const styles = {
        PENDING:
            "border-yellow-200 bg-yellow-50 text-yellow-700",
        APPROVED:
            "border-green-200 bg-green-50 text-green-700",
        REJECTED:
            "border-red-200 bg-red-50 text-red-700",
        CANCELLED:
            "border-gray-200 bg-gray-50 text-gray-600",
        ACTIVE:
            "border-blue-200 bg-blue-50 text-blue-700",
        COMPLETED:
            "border-purple-200 bg-purple-50 text-purple-700",
    };

    return (
        <span
            className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold ${styles[status]}`}
        >
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
            {formatStatus(status)}
        </span>
    );
}

function formatStatus(status: RentalRequest["status"]) {
    return (
        status.charAt(0) +
        status.slice(1).toLowerCase()
    );
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}