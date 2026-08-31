"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LoginState = {
  success: true;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export interface AuthState {
  success: boolean;
  message: string;
}

export const loginAction = async (
  prevState: LoginState,
  formData: FormData
) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = {
    email,
    password,
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    const cookieStore = await cookies();

    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

    if (decodedToken.role === "ADMIN") {
      redirect("/dashboard/admin");
    } else if (decodedToken.role === "TENANT") {
      redirect("/dashboard/tenant");
    } else if (decodedToken.role === "LANDLORD") {
      redirect("/dashboard/landlord");
    }
  }

  return result;
};

export async function signupAction(formData: FormData): Promise<AuthState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!name || !email || !role || !password || !confirmPassword) {
    return { success: false, message: "All fields are required" };
  }

  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match" };
  }

  if (password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters",
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, password }),
      }
    );

    const result = await res.json();

    if (!res.ok || !result.data) {
      return {
        success: false,
        message: result.message || "Registration failed",
      };
    }

    const { accessToken, refreshToken } = result.data;
    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return {
      success: true,
      message: "Account created successfully",
    };
  } catch {
    return {
      success: false,
      message: "Network error. Please try again.",
    };
  }
}
