export type UserRole = "ADMIN" | "LANDLORD" | "TENANT"

export type UserStatus = "ACTIVE" | "BANNED"

export type AdminUser = {
  id: string
  name: string
  email: string
  phone?: string | null
  role: UserRole
  status: UserStatus
  createdAt: string
}

export type AdminUsersResponse = {
  success: boolean
  message: string
  data: AdminUser[]
}

export type UpdateUserData = {
  status?: UserStatus
  role?: UserRole
}