import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";
import { getUserFromToken } from "@/helper/auth.helper";
import { success } from "zod";

export const POST = async (req: NextRequest) => {
  try {
    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const userId = user.id;

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: true,
      },
    });

    return NextResponse.json({ success: true, cart }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch cart" },
      { status: 500 }
    );
  }
};
