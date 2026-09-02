import { getTenantPayments, getTenantRentals } from "../_actions/tenant";
import PaymentHistory from "../_components/PaymentHistory";
import RentalRequests from "../_components/RentalRequest";

import TenantOverview from "../_components/TenantOverview";

export default async function TenantDashboard() {
    const [rentals, payments] = await Promise.all([
        getTenantRentals(),
        getTenantPayments(),
    ]);

    return (
        <main className="min-h-screen bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Tenant Dashboard
                    </h1>

                    <p className="mt-2 text-muted-foreground">
                        Manage your rental requests and payments.
                    </p>
                </div>

                <TenantOverview
                    rentals={rentals}
                    payments={payments}
                />

                <RentalRequests rentals={rentals} />

                <PaymentHistory payments={payments} />
            </div>
        </main>
    );
}