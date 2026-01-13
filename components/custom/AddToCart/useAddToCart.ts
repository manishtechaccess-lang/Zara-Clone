import axios from "axios";
import { useTransition } from "react";
import ErrorToast from "../Toast/ErrorToast";
import SuccessToast from "../Toast/SuccessToast";

const useAddToCart = () => {
  const [isPending, startTransition] = useTransition();

  const addToCart = (proId: string) => {
    startTransition(async () => {
      try {
        const productId = String(proId);

        const response = await axios.post(
          "/api/cart/add-to-cart",
          { productId },
          { withCredentials: true }
        );

        if (!response.data.success) {
          ErrorToast(response.data.message);
          return;
        }
        SuccessToast("Added to cart successfully");
        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to add to cart";
        ErrorToast(errorMessage);
        console.error("Failed to add to cart: ", error);
      }
    });
  };
  return { addToCart, isPending };
};

export default useAddToCart;
