
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import type { Payment } from "@/types/payment";

type PaymentHistoryProps = {
    payments: Payment[];
};

function getPaymentStatusClass(status: string) {
    switch (status.toUpperCase()) {
        case "COMPLETED":
            return "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";

        case "PENDING":
            return "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400";

        case "FAILED":
        case "CANCELLED":
            return "border-destructive/30 bg-destructive/10 text-destructive";

        case "REFUNDED":
            return "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-400";

        default:
            return "border-border bg-muted text-muted-foreground";
    }
}

export default function PaymentHistory({
    payments,
}: PaymentHistoryProps) {
    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Payment History</CardTitle>
            </CardHeader>

            <CardContent>
                {payments.length === 0 ? (
                    <div className="py-10 text-center">
                        <p className="text-muted-foreground">
                            No payment history available.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {payments.map((payment) => (
                            <div
                                key={payment.id}
                                className="flex flex-col justify-between gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center"
                            >
                                <div className="min-w-0">
                                    <p className="break-all font-semibold text-card-foreground">
                                        Payment #{payment.id}
                                    </p>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {new Date(payment.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-4">
                                    <p className="font-semibold text-card-foreground">
                                        ৳
                                        {Number(payment.amount).toLocaleString("en-BD")}
                                    </p>

                                    <Badge
                                        variant="outline"
                                        className={getPaymentStatusClass(
                                            String(payment.status)
                                        )}
                                    >
                                        {String(payment.status)
                                            .charAt(0)
                                            .toUpperCase() +
                                            String(payment.status).slice(1).toLowerCase()}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}