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
    const decoded: any = jwt.verify(token, process.env.CONCEALED_TOKEN!);

    const userId = decoded.id;

    const { productId, quantity = 1 } = await req.json();

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID required" },
        { status: 400 }
      );
    }

    let cart = await prisma.cart.findUnique({
      where: { userId },
    });
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });
    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }
    return NextResponse.json(
      {
        success: true,
        message: "Added to cart successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Add to cart error: ", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
