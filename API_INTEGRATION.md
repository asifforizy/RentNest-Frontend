# RentNest Frontend ↔ Backend API Mapping

| **Next.js Route** | **Component / Feature** | **Backend API Consumption** |
|---|---|---|
| `/` | Home page with featured properties | `GET /api/properties` |
| `/properties` | Browse properties | `GET /api/properties` |
| `/properties/[id]` | Property details & request CTA | `GET /api/properties/:id` |
| `/auth/register` | Role selection & registration form | `POST /api/auth/register` |
| `/auth/login` | Login form | `POST /api/auth/login` |
| `/dashboard` | Role-based dashboard redirect | `GET /api/auth/me` |
| `/dashboard/tenant` | Tenant overview & rental history | `GET /api/rentals`<br>`GET /api/payments` |
| `/dashboard/tenant/requests/[id]/pay` | Payment initiation | `POST /api/payments/create` |
| `/payment/success` | Payment success page | Payment session / URL parameters |
| `/payment/cancel` | Payment cancellation page | Payment session / URL parameters |
| `/dashboard/landlord` | Landlord overview & properties | `GET /api/landlord/my-properties` |
| `/dashboard/landlord/properties/new` | Create property | `POST /api/landlord/properties` |
| `/dashboard/landlord/properties/[id]/edit` | Edit property | `PUT /api/landlord/properties/:id` |
| `/dashboard/landlord/properties/[id]` | Property management | `GET /api/landlord/my-properties` |
| `/dashboard/landlord/requests` | Manage rental requests | `GET /api/landlord/requests`<br>`PATCH /api/landlord/requests/:id` |
| `/dashboard/admin` | Admin dashboard | `GET /api/admin/users` |
| `/dashboard/admin/users` | User management | `GET /api/admin/users`<br>`PATCH /api/admin/users/:id` |


