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
    <Link href={`/properties/${property.id}`} className="block h-full">
      <Card className="group flex h-full flex-col gap-0 overflow-hidden py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* Image with padding */}
        <div className="p-3 pb-0">
          <div className="relative h-52 w-full overflow-hidden rounded-xl bg-muted">
            {property.propertyPhoto ? (
              <Image
                unoptimized
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={property.propertyPhoto}
                alt={property.title}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No Image
              </div>
            )}

            <Badge
              variant={isAvailable ? "default" : "destructive"}
              className="absolute right-3 top-3"
            >
              {property.availability}
            </Badge>
          </div>
        </div>

        <CardHeader className="px-5 pb-2 pt-4">
          <CardTitle className="line-clamp-1 text-xl">
            {property.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {property.city}, {property.country}
          </p>
        </CardHeader>

        {/* flex-1 pushes the footer to the bottom on every card */}
        <CardContent className="flex flex-1 flex-col justify-between gap-4 px-5">
          <p className="line-clamp-2 min-h-[2.5rem] text-sm text-muted-foreground">
            {property.description}
          </p>

          <div>
            <span className="text-2xl font-bold">
              ৳{property.rentPrice.toLocaleString()}
            </span>
            <span className="ml-1 text-sm text-muted-foreground">/ month</span>
          </div>
        </CardContent>

        <CardFooter className="mt-4 border-t px-5 py-4">
          <div className="flex flex-col">
            <p className="text-xs leading-none text-muted-foreground">
              Listed by
            </p>
            <p className="mt-1 text-sm font-medium leading-tight">
              {property.landlord.name}
            </p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}