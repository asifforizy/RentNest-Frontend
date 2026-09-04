# Frontend API Integration Analysis (RentNest)

## Scope
This document maps API consumption in the frontend codebase, including service/action modules, direct API calls in pages/components, endpoint usage, data models, and integration gaps.

---

## 1) API service files, HTTP clients, and API call locations

### HTTP client strategy
- The codebase uses native `fetch` for backend communication; no axios client or centralized HTTP SDK was found.
  - Evidence: `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/_actions/tenant.ts:16,40`, `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/auth/_actions/authAction.ts:31,92`, `/home/runner/work/RentNest-Frontend/RentNest-Frontend/service/getMe.ts:17`

### Service modules
- `getMe()` calls auth profile endpoint:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/service/getMe.ts:6-33`
  - Endpoint call: `/home/runner/work/RentNest-Frontend/RentNest-Frontend/service/getMe.ts:17`
- `getNewAccessToken()` calls refresh endpoint:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/service/refreshToken.ts:5-29`
  - Endpoint call: `/home/runner/work/RentNest-Frontend/RentNest-Frontend/service/refreshToken.ts:17`
- `logout()` clears cookies and revalidates cache tags (no backend fetch):
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/service/logout.ts:7-13`

### Server action modules (API orchestration layer)
- Auth actions:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/auth/_actions/authAction.ts:22-138`
- Profile actions:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/auth/_actions/profile.ts:18-61`
- Public property/rental actions:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/(public)/_actions/properties.ts:3-17`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/(public)/_actions/rental.ts:8-39`
- Landlord dashboard actions:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/_actions/landlord.ts:24-201`
- Tenant dashboard actions:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/_actions/tenant.ts:13-59`
- Payment session action:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/tenant/_actions/payment.ts:5-39`
- Admin actions:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/admin/_actions/admin.ts:10-95`

---

## 2) Components and pages that make API requests

## A) Direct `fetch` calls in page components
- Dashboard role redirect page:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/page.tsx:13-19`
- Public property details page:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/(public)/properties/[id]/page.tsx:16-21`
- Landlord rental requests page:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/landlord/requests/page.tsx:12-22`

## B) Components/pages invoking server actions (indirect API calls)

### Global/layout-level user bootstrap
Layouts call `getMe()` (which calls backend `/api/auth/me`):
- `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/(public)/layout.tsx:3,14`
- `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/auth/layout.tsx:3,14`
- `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/layout.tsx:3,14`
- `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/about/layout.tsx:3,14`
- `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/contact/layout.tsx:3,14`
- `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/services/layout.tsx:3,14`

### Auth components
- Login form uses `loginAction`:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/auth/_components/LoginForm.tsx:7,16`
- Signup form uses `signupAction`:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/auth/_components/SignupForm.tsx:14,31`

### Public browsing/request components
- Properties list page uses `getAllProperties`:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/(public)/properties/page.tsx:2,8`
- Homepage featured section uses `getAllProperties`:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/(public)/_components/FeaturedProperties.tsx:4,8`
- Request-to-rent form uses `createRentalAction`:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/(public)/_components/RequestToRentForm.tsx:5,33`

### Landlord pages/components
- Dashboard page uses properties + requests actions:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/landlord/page.tsx:9,15-16`
- Property listing page:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/landlord/properties/page.tsx:4,9`
- Property details/edit pages reuse `getMyPropertiesAction`:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/landlord/properties/[id]/page.tsx:6,20`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/landlord/properties/[id]/edit/page.tsx:3,20`
- Create property form uses category + create APIs:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/_components/CreatePropertyForm.tsx:6,36,83`
- Edit form uses update action:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/_components/EditForm.tsx:11,59`
- Property management actions use delete action:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/_components/PropertyManagementActions.tsx:7,35`
- Request details page uses `getRentalRequestById`:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/landlord/requests/[id]/page.tsx:8,21`
- Rental status manager uses update request action:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/_components/RentalStatusManager.tsx:12-13,51`

### Tenant pages/components
- Tenant dashboard uses rentals + payments actions:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/tenant/page.tsx:1,8-11`
- Pay-now button calls checkout creation action:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/tenant/_components/PayNowButton.tsx:5,23`

### Admin pages/components
- Admin summary page uses users action:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/admin/page.tsx:2,9`
- Admin users page uses users action:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/admin/users/page.tsx:1,6`
- Users table uses update user action:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/admin/_components/UsersTable.tsx:17,76`

---

## 3) Backend endpoints being called

### Auth endpoints
- `POST /api/auth/login`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/auth/_actions/authAction.ts:31`
- `POST /api/auth/register`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/auth/_actions/authAction.ts:92`
- `GET /api/auth/me`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/service/getMe.ts:17`
- `POST /api/auth/refresh-token`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/service/refreshToken.ts:17`
- Client-side role check also calls `/api/auth/me` using public env var:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/page.tsx:14`

### User profile endpoints
- `GET /api/users/profile`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/auth/_actions/profile.ts:21`
- `PUT /api/users/profile`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/auth/_actions/profile.ts:46`

### Property endpoints
- `GET /api/properties`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/(public)/_actions/properties.ts:4`
- `GET /api/properties/:id`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/(public)/properties/[id]/page.tsx:17`
- `GET /api/landlord/my-properties`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/_actions/landlord.ts:27`
- `POST /api/landlord/properties`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/_actions/landlord.ts:45`
- `PUT /api/landlord/properties/:id`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/_actions/landlord.ts:68`
- `DELETE /api/landlord/properties/:id`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/_actions/landlord.ts:85`

### Rental request endpoints
- `POST /api/rentals`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/(public)/_actions/rental.ts:19`
- `GET /api/rentals`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/_actions/tenant.ts:16`
- `GET /api/landlord/requests`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/_actions/landlord.ts:160`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/landlord/requests/page.tsx:13`
- `PATCH /api/landlord/requests/:id`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/_actions/landlord.ts:124`
- Hardcoded production URL usage:
  - `https://rent-nest-beta.vercel.app/api/landlord/requests`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/_actions/landlord.ts:102`

### Payment endpoints
- `GET /api/payments`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/_actions/tenant.ts:40`
- `POST /api/payments/create`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/tenant/_actions/payment.ts:17`

### Admin endpoints
- `GET /api/admin/users`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/admin/_actions/admin.ts:24`
- `PATCH /api/admin/users/:userId`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/admin/_actions/admin.ts:69`

### Taxonomy/category endpoint
- `GET /api/categories`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/_actions/landlord.ts:143`

---

## 4) Data models and relationships

### Core models (from `/types`)

- `Property`
  - Fields include `landlordId`, `categoryId`, and embedded landlord summary.
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/types/property.ts:2-20`

- `LandlordProperty`
  - Includes `categoryId`, optional embedded `category`, optional `landlordId`.
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/types/landlord.ts:10-29`

- `RentalRequest`
  - Ties together `propertyId`, optional `tenantId`, optional embedded `tenant`, `property`, and `payment`.
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/types/landlord.ts:40-76`

- `Rental`
  - Tenant-facing rental request summary with optional embedded property details.
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/types/rental.ts:1-11`

- `Payment`
  - Basic payment ledger object with amount/status/time.
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/types/payment.ts:1-10`

- `AdminUser`
  - Administrative view of user role and status.
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/types/admin.ts:5-24`

- Input models
  - `CreatePropertyInput`:
    - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/types/landlord.ts:31-39`
  - `CreateRentalRequestInput`:
    - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/types/tenant.ts:1-5`

### Relationship mapping
- User (LANDLORD) -> many properties
- Property -> belongs to category
- User (TENANT) -> many rental requests
- RentalRequest -> belongs to property; may have one payment
- AdminUser is a role/status projection over users

---

## 5) Environment configuration for API base URLs

- Server-side API base URL is predominantly `process.env.BACKEND_API_URL`:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/_actions/landlord.ts:11`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/admin/_actions/admin.ts:8`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/auth/_actions/profile.ts:5`
  - Additional usages: `/home/runner/work/RentNest-Frontend/RentNest-Frontend/service/getMe.ts:17`, `/home/runner/work/RentNest-Frontend/RentNest-Frontend/service/refreshToken.ts:17`

- Client-side dashboard redirect uses `process.env.NEXT_PUBLIC_API_URL`:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/page.tsx:14`

- One hardcoded production URL bypasses env config:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/_actions/landlord.ts:102`

---

## 6) Data fetching hooks and state management related to API data

- No SWR/React Query/Redux async tooling found for API data orchestration.
- Data fetching is done via:
  - Server components awaiting server actions
  - Client components invoking server actions on events
  - Local component state (`useState`, `useEffect`) for loading/error/form state

Examples:
- Category bootstrap in client form via `useEffect` + server action:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/_components/CreatePropertyForm.tsx:28-57`
- Auth form using `useActionState` with server action:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/auth/_components/LoginForm.tsx:6-27`
- Tenant/admin mutation state in client components:
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/tenant/_components/PayNowButton.tsx:14-45`
  - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/admin/_components/UsersTable.tsx:69-105`

---

## 7) Missing or incomplete API integrations

1. **Profile action module appears unused**
   - Declared but no consuming component/page found for:
     - `getMyProfileAction`
     - `updateProfileAction`
   - Definition: `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/auth/_actions/profile.ts:18-61`

2. **Landlord requests data access is duplicated and inconsistent**
   - Direct page-level fetch exists:
     - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/landlord/requests/page.tsx:12-22`
   - Action-level fetch exists too:
     - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/_actions/landlord.ts:157-175`
   - Plus a separate unused action with hardcoded URL:
     - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/_actions/landlord.ts:98-116`

3. **Request detail retrieval is list-based, not resource-based**
   - `getRentalRequestById` fetches `/api/landlord/requests` list then filters by id locally.
   - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/_actions/landlord.ts:183-200`
   - This suggests no dedicated read endpoint integration like `/api/landlord/requests/:id`.

4. **Payment completion flow lacks explicit verification call in success/cancel pages**
   - Success and cancel pages are static confirmation UIs.
   - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/payments/success/page.tsx:3-29`
   - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/payments/cancel/page.tsx:3-29`

5. **Base URL strategy is inconsistent**
   - `BACKEND_API_URL` used in server actions/services, but `NEXT_PUBLIC_API_URL` used in dashboard role redirect client page.
   - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/app/dashboard/page.tsx:14`

6. **Feature claim mismatch: reviews/ratings advertised but no integration found**
   - README states reviews/ratings support:
     - `/home/runner/work/RentNest-Frontend/RentNest-Frontend/README.md:23`
   - No review/rating API consumers found in app/service/type scans.

---

## 8) Quick endpoint inventory

- Auth: `/api/auth/login`, `/api/auth/register`, `/api/auth/me`, `/api/auth/refresh-token`
- Users: `/api/users/profile`
- Public properties: `/api/properties`, `/api/properties/:id`
- Landlord properties: `/api/landlord/my-properties`, `/api/landlord/properties`, `/api/landlord/properties/:id`
- Rental requests: `/api/rentals`, `/api/landlord/requests`, `/api/landlord/requests/:id` (PATCH)
- Payments: `/api/payments`, `/api/payments/create`
- Admin: `/api/admin/users`, `/api/admin/users/:userId`
- Taxonomy: `/api/categories`

