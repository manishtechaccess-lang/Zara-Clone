import { NextResponse } from "next/server";
import axios from "axios";

const getProductData = async (productId: string | number) => {
  try {
    const response = await axios.get(
      `https://api.escuelajs.co/api/v1/products/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product from external API:", error);
    return NextResponse.json(
      { success: false, message: "Product not found in external API" },
      { status: 404 }
    );
  }
};

export default getProductData;
