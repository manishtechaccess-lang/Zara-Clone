import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
  } catch {}
};
