export interface LandlordProperty {
  id: string;
  title: string;
  description?: string;

  location: string;
  rent: number;

  bedrooms?: number;
  bathrooms?: number;

  image?: string;

  status?: "AVAILABLE" | "RENTED";

  createdAt?: string;
}

export interface CreatePropertyInput {
  title: string;
  description: string;

  location: string;
  rent: number;

  bedrooms: number;
  bathrooms: number;

  image?: string;
}

export interface RentalRequest {
  id: string;

  propertyId: string;

  status: RequestStatus;

  tenant?: {
    id: string;
    name: string;
    email: string;
  };

  property?: {
    id: string;
    title: string;
    location: string;
  };

  createdAt: string;
}

export type RequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";