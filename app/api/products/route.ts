// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import productsData from "@/app/Data/dummy.json";

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json(
      {
        success: true,
        data: productsData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API PRODUCTS ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
