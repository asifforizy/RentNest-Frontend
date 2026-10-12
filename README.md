# RentNest Frontend

RentNest is a full-stack rental property platform where **landlords** can list rental properties, **tenants** can find and request rentals, and **administrators** can manage the entire platform. The system provides secure authentication, role-based authorization, rental request management, payments, and reviews.

This repository contains the **frontend** application built with Next.js, React, TypeScript, and Tailwind CSS.

## Demo Credentials

Use these accounts to test the platform:

| Role     | Email                  | Password    |
|----------|------------------------|-------------|
| Admin    | asif@gmail.com     | 12345    |
| Landlord | oni@gmail.com  | 123456     |
| Tenant   | mahie@gmail.com    | 123456   |

> **Note:** These credentials are for demo/testing only. Do not use them in production.

## Tech Stack

- [Next.js](https://nextjs.org/) – React framework for production
- [React](https://react.dev/) – UI library
- [TypeScript](https://www.typescriptlang.org/) – Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) – Re-usable components built with Radix UI and Tailwind
- [Radix UI](https://www.radix-ui.com/) – Unstyled, accessible UI primitives
- [Lucide React](https://lucide.dev/) – Beautiful & consistent icons
- [Recharts](https://recharts.org/) – Composable charting library

## Features

- 🔐 Secure user authentication (JWT / session based)
- 👥 Role-based access control for **Landlords**, **Tenants**, and **Admins**
- 🏠 Rental property listings and advanced discovery
- 📋 Rental request and approval workflow
- 💳 Payment handling support
- ⭐ Reviews and ratings
- 📱 Responsive, modern user interface
- 📊 Dashboard with analytics (Recharts)

## Getting Started

### Prerequisites

- Node.js **20 or newer**
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/rentnest-frontend.git
cd rentnest-frontend

# Install dependencies
npm install
# or
pnpm install
# or
yarn install