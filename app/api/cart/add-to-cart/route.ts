import { NextResponse, NextRequest } from "next/server";
import { getUserFromToken } from "@/helper/auth.helper";
import { prisma } from "@/libs/prisma";
import getProductData from "@/helper/getProductData";

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

    const { productId, quantity = 1 } = await req.json();

    console.log("Adding product to cart: ", productId);

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID required" },
        { status: 400 }
      );
    }

    const productData = await getProductData(productId);

    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: { items: true },
      });
    }

    // const existingItem = await prisma.cartItem.findFirst({
    //   where: {
    //     cartId: cart.id,
    //     productId,
    //   },
    // });

    const existingItem = cart.items.find(
      (item) => item.externalProductId === String(productId)
    );

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
          title: productData.title,
          price: productData.price,
          image: productData.images?.[0] || null,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          externalProductId: String(productId),
          title: productData.title,
          price: productData.price,
          image: productData.images?.[0] || null,
          quantity,
        },
      });
    }

    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: { items: true },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Added to cart successfully",
        cart: updatedCart,
        totalItems:
          updatedCart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Add to cart error: ", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
