import Link from "next/link";
import {
  Building2,
  CircleCheck,
  Home,
  Inbox,
  Plus,
  ArrowRight,
} from "lucide-react";

import { getMyPropertiesAction, getMyRentalRequestsAction } from "../_actions/landlord";
import type { LandlordProperty } from "@/types/landlord";
import PropertyCard from "../_components/PropertyCard";


export default async function LandlordDashboardPage() {
  const properties = await getMyPropertiesAction();
  const rentalRequests = await getMyRentalRequestsAction();
  const totalProperties = properties?.length || 0;
  const totalRequests = rentalRequests?.length || 0;

  const availableProperties =
    properties?.filter(
      (property: LandlordProperty) =>
        property.availability === "AVAILABLE"
    ).length || 0;

  const unavailableProperties =
    properties?.filter(
      (property: LandlordProperty) =>
        property.availability === "UNAVAILABLE"
    ).length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Landlord Dashboard
            </h1>
            <p className="mt-2 text-gray-500">
              Manage your properties and rental requests in one place.
            </p>
          </div>
          <Link
            href="/dashboard/landlord/properties/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 font-medium text-white transition hover:bg-gray-800"
          >
            <Plus size={20} />
            Add Property
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/dashboard/landlord/properties"
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-gray-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Properties
                </p>
                <h2 className="mt-3 text-3xl font-bold text-gray-900">
                  {totalProperties}
                </h2>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-gray-600 group-hover:text-gray-900">
                  View all
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </div>
              </div>
              <div className="rounded-xl bg-gray-100 p-3">
                <Building2
                  size={22}
                  className="text-gray-700"
                />
              </div>
            </div>
          </Link>


          <Link
            href="/dashboard/landlord/properties?availability=AVAILABLE"
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-gray-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Available Properties
                </p>
                <h2 className="mt-3 text-3xl font-bold text-gray-900">
                  {availableProperties}
                </h2>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-gray-600 group-hover:text-gray-900">
                  View properties
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </div>
              </div>
              <div className="rounded-xl bg-gray-100 p-3">
                <CircleCheck
                  size={22}
                  className="text-gray-700"
                />
              </div>
            </div>
          </Link>



          <Link
            href="/dashboard/landlord/properties?availability=UNAVAILABLE"
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-gray-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Unavailable Properties
                </p>
                <h2 className="mt-3 text-3xl font-bold text-gray-900">
                  {unavailableProperties}
                </h2>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-gray-600 group-hover:text-gray-900">
                  View unavailable
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </div>
              </div>
              <div className="rounded-xl bg-gray-100 p-3">
                <Home
                  size={22}
                  className="text-gray-700"
                />
              </div>
            </div>
          </Link>



          <Link
            href="/dashboard/landlord/requests"
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-gray-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Rental Requests
                </p>
                <h2 className="mt-3 text-3xl font-bold text-gray-900">
                  {totalRequests}
                </h2>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-gray-600 group-hover:text-gray-900">
                  Manage requests
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </div>
              </div>
              <div className="rounded-xl bg-gray-100 p-3">
                <Inbox
                  size={22}
                  className="text-gray-700"
                />
              </div>
            </div>
          </Link>
        </div>



        <div className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Recent Properties
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Your latest property listings.
              </p>
            </div>


            <Link
              href="/dashboard/landlord/properties"
              className="hidden items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:flex"
            >
              View All Properties
              <ArrowRight size={16} />
            </Link>
          </div>


          {properties?.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {properties.slice(0, 3).map((property: LandlordProperty) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                />
              ))}
            </div>

          ) : (


            <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                <Building2
                  size={26}
                  className="text-gray-500"
                />
              </div>


              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                No properties yet
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
                Start growing your rental business by adding
                your first property.
              </p>


              <Link
                href="/dashboard/landlord/properties/new"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
              >

                <Plus size={18} />
                Add Your First Property
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}