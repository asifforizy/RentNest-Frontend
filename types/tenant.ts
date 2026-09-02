export interface CreateRentalRequestInput {
    propertyId: string;
    moveInDate: string;
    message: string;
}


export interface Props {
    propertyId: string;
    onSuccess?: () => void;
}