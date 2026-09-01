"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { createPropertyAction } from "../_actions/landlord";


export default function CreatePropertyForm() {

    const router = useRouter();

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({
            title: "",
            description: "",
            location: "",
            rent: "",
            bedrooms: "",
            bathrooms: "",
            image: "",
        });


    function handleChange(
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) {

        setFormData({
            ...formData,

            [e.target.name]:
                e.target.value,
        });

    }


    async function handleSubmit(
        e: React.FormEvent
    ) {

        e.preventDefault();

        try {

            setLoading(true);

            await createPropertyAction({
                title: formData.title,

                description:
                    formData.description,

                location:
                    formData.location,

                rent:
                    Number(formData.rent),

                bedrooms:
                    Number(formData.bedrooms),

                bathrooms:
                    Number(formData.bathrooms),

                image:
                    formData.image,
            });

            router.push(
                "/dashboard/landlord"
            );

            router.refresh();

        } catch (error) {

            console.error(error);

            alert(
                "Failed to create property"
            );

        } finally {

            setLoading(false);

        }
    }


    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-4 max-w-xl"
        >

            <input
                name="title"
                placeholder="Property Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                required
            />

            <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                required
            />

            <input
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                required
            />

            <input
                type="number"
                name="rent"
                placeholder="Monthly Rent"
                value={formData.rent}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                required
            />

            <input
                type="number"
                name="bedrooms"
                placeholder="Bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                required
            />

            <input
                type="number"
                name="bathrooms"
                placeholder="Bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                required
            />

            <button
                disabled={loading}
                type="submit"
                className="bg-gray-900 text-white px-5 py-3 rounded"
            >

                {loading
                    ? "Creating..."
                    : "Create Property"}

            </button>

        </form>

    );
}