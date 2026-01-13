import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export interface AuthUser {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
}

export const getUserFromToken = async (
  req?: NextRequest
): Promise<AuthUser | null> => {
  try {
    let token;

    console.log(req?.cookies.get("token")?.value);
    if (req) {
      token = req.cookies.get("token")?.value;
      //   console.log(token);
    } else {
      const cookieStore = await cookies();
      token = cookieStore.get("token")?.value;
    }

    if (!token) return null;

    const decoded: any = jwt.verify(
      token,
      process.env.CONCEALED_TOKEN!
    ) as AuthUser;

    console.log("Token decoded successfully:", {
      id: decoded.id,
      email: decoded.email,
    });

    return decoded;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
};
