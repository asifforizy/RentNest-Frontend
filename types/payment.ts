export type Payment = {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
};

export type PaymentsResponse = {
  data: Payment[];
};