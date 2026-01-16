import { NextResponse } from "next/server";
import axios from "axios";

const MOCKI_URL = "https://mocki.io/v1/2ea6ca34-0766-4709-837d-39e2b04d39d8";

const getProductData = async (productId: string | number) => {
  try {
    const response = await axios.get(MOCKI_URL);

    const product = response.data.find((p: any) => p.id === Number(productId));

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }
    return product;
  } catch (error) {
    console.error("Failed to fetch product from external API:", error);
    return NextResponse.json(
      { success: false, message: "Product not found in external API" },
      { status: 404 }
    );
  }
};

export default getProductData;
