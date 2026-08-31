
export interface Property{
    id: string;
    landlordId: string;
    categoryId: string;
    title: string;
    description: string;
    rentPrice: number;
    propertyPhoto: string;
    city: string;
    country: string;
    availability: string;
    createdAt: string;
    updatedAt: string;
    landlord: {
        id: string;
        name: string;
        email: string;
    };
}


export interface PropertyCardProps {
  property: Property;
}



export interface PropertyListProps {
  properties: Property[];
}



export  interface PropertiesPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    location?: string;
  }>;
}