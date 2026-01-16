import axios from "axios";
import { useTransition } from "react";
import ErrorToast from "../Toast/ErrorToast";
import SuccessToast from "../Toast/SuccessToast";
import { setCart } from "@/libs/dataslice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const useAddToCart = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();

  const addToCart = (proId: string) => {
    startTransition(async () => {
      try {
        const productId = String(proId);
        // console.log(productId);

        const response = await axios.post(
          "/api/cart/add-to-cart",
          { productId },
          { withCredentials: true }
        );

        if (!response.data.success) {
          ErrorToast(response.data.message);
          return;
        }
        console.log(response.data.cart);
        dispatch(setCart(response.data.cart));
        SuccessToast("Added to cart successfully");
        // return response.data;
      } catch (error: any) {
        const message = error.response?.data?.message;
        console.log(error);

        if (message === "Unauthorized") {
          ErrorToast("Please login to add items to your cart");
          router.push("/auth/Login"); // ✅ correct path
          return;
        }
        ErrorToast(message || "Failed to add to cart");
        console.error("Failed to add to cart: ", error);
      }
    });
  };
  return { addToCart, isPending };
};

export default useAddToCart;
