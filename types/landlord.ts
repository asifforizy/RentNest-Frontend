export interface Category {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LandlordProperty {
  id: string;
  title: string;
  description?: string;

  city: string;
  country: string;

  rentPrice: number;
  propertyPhoto?: string;

  availability?: "AVAILABLE" | "UNAVAILABLE";

  categoryId: string;
  category?: Category;

  landlordId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePropertyInput {
  title: string;
  description?: string;
  city?: string;
  country?: string;
  rentPrice: number;
  propertyPhoto?: string;
  categoryId: string;
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
    city: string;
    country: string;
  };

  createdAt: string;
}

export type RequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";