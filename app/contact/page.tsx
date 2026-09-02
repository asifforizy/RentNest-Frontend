// app/contact/page.tsx

import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen">
            {/* Page Header */}
            <section className="px-4 pt-12 pb-8 md:pt-16 md:pb-10">
                <div className="container mx-auto">
                    <h1 className="text-center text-4xl font-bold tracking-tight md:text-5xl">
                        Contact Us
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
                        Have a question or need help? We'd love to hear from you.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="container mx-auto px-4 pb-12 md:pb-16">
                <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
                    {/* Contact Information */}
                    <div className="rounded-2xl border bg-card p-6 md:p-8">
                        <h2 className="text-2xl font-semibold">Get in Touch</h2>

                        <p className="mt-3 leading-7 text-muted-foreground">
                            Whether you need help finding a property, managing your listing,
                            or using RentNest, our team is here to help.
                        </p>

                        <div className="mt-8 space-y-5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                                    <Mail className="h-5 w-5 text-primary" />
                                </div>

                                <div>
                                    <p className="font-medium">Email</p>
                                    <p className="text-sm text-muted-foreground">
                                        asifforizy@gmail.com
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                                    <Phone className="h-5 w-5 text-primary" />
                                </div>

                                <div>
                                    <p className="font-medium">Phone</p>
                                    <p className="text-sm text-muted-foreground">
                                        +880 1626950127
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                                    <MapPin className="h-5 w-5 text-primary" />
                                </div>

                                <div>
                                    <p className="font-medium">Location</p>
                                    <p className="text-sm text-muted-foreground">
                                        Dhaka, Bangladesh
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="rounded-2xl border bg-card p-6 md:p-8">
                        <h2 className="text-2xl font-semibold">Send us a Message</h2>

                        <form className="mt-6 space-y-5">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Full Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full rounded-lg border bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-primary/30"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Email Address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full rounded-lg border bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-primary/30"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Message
                                </label>

                                <textarea
                                    id="message"
                                    rows={5}
                                    placeholder="Write your message..."
                                    className="w-full resize-none rounded-lg border bg-background px-4 py-3 outline-none transition focus:ring-2 focus:ring-primary/30"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}