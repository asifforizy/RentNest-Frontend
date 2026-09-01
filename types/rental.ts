export type Rental = {
  id: string;
  status: string;
  createdAt: string;
  property?: {
    id: string;
    title: string;
    rentPrice?: number;
    propertyPhoto?: string;
  };
};

export type RentalsResponse = {
  data: Rental[];
};