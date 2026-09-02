
import { PropertyCardProps } from "@/types/property";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";



export default function PropertyCard({ property }: PropertyCardProps) {
    const isAvailable = property.availability === "AVAILABLE";

    return (
        <Link href={`/properties/${property.id}`}>
            <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ">

                <div className="relative h-56 w-full overflow-hidden bg-muted">
                    {property.propertyPhoto ? (
                        <Image
                            unoptimized
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            src={property.propertyPhoto}
                            alt={property.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 "
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                            No Image
                        </div>
                    )}

                    <Badge variant={isAvailable ? "default" : "destructive"} className="absolute right-3 top-3" >
                        {property.availability}
                    </Badge>
                </div>

                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                        <CardTitle className="line-clamp-1 text-xl">
                            {property.title}
                        </CardTitle>
                    </div>


                    <div className="flex items-center gap-2 text-sm text-muted-foreground">

                        <span>
                            {property.city}, {property.country}
                        </span>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">

                    <p className="text-sm text-muted-foreground">
                        {property.description?.split(" ").slice(0, 15).join(" ")}
                        {property.description?.split(" ").length > 15 && "..."}
                    </p>

                    <div>
                        <span className="text-2xl font-bold">
                            ৳{property.rentPrice.toLocaleString()}
                        </span>

                        <span className="ml-1 text-sm text-muted-foreground">
                            / month
                        </span>
                    </div>
                </CardContent>

                <CardFooter className="border-t pt-4">
                    <div className="flex items-center gap-3">


                        <div className="flex flex-col">
                            <p className="text-xs text-muted-foreground leading-none">
                                Listed by
                            </p>
                            <p className="text-sm font-medium leading-tight mt-1">
                                {property.landlord.name}
                            </p>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}