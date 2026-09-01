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
                                className="flex flex-col justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
                            >
                                <div>
                                    <p className="font-semibold">
                                        Payment #{payment.id}
                                    </p>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {new Date(
                                            payment.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <p className="font-semibold">
                                        ৳{payment.amount}
                                    </p>

                                    <Badge>
                                        {payment.status}
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