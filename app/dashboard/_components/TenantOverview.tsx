import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type { Rental } from "@/types/rental";
import type { Payment } from "@/types/payment";

type TenantOverviewProps = {
    rentals: Rental[];
    payments: Payment[];
};

export default function TenantOverview({
    rentals,
    payments,
}: TenantOverviewProps) {
    const pendingRequests = rentals.filter(
        (rental) => rental.status === "PENDING"
    ).length;

    const approvedRequests = rentals.filter(
        (rental) => rental.status === "APPROVED"
    ).length;

    const paidPayments = payments.filter(
        (payment) => payment.status === "PAID"
    ).length;

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">


            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium">
                        Total Requests
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <p className="text-3xl font-bold">
                        {rentals.length}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Rental requests
                    </p>
                </CardContent>
            </Card>


            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium">
                        Pending Requests
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <p className="text-3xl font-bold">
                        {pendingRequests}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Waiting for approval
                    </p>
                </CardContent>
            </Card>

  
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium">
                        Approved Rentals
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <p className="text-3xl font-bold">
                        {approvedRequests}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Approved requests
                    </p>
                </CardContent>
            </Card>

     
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium">
                        Payments Made
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <p className="text-3xl font-bold">
                        {paidPayments}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Successful payments
                    </p>
                </CardContent>
            </Card>

        </div>
    );
}