"use client";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ErrorToast from "@/components/custom/Toast/ErrorToast";
import Navbar from "@/components/layout/Navbar/Navbar";
import { RiBookLine, RiBookmarkLine } from "@remixicon/react";
import useAddToCart from "@/components/custom/AddToCart/useAddToCart";

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}
interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string;
  updatedAt: string;
}

const Product = () => {
  const params = useParams();
  const navigate = useRouter();
  const [product, setProducts] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, isPending } = useAddToCart();

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/${params.id}`
      );
      setProducts(response.data);
      //   setLoading(false);
    } catch (error) {
      console.error("Failed to fetch product data: ", error);
      ErrorToast("Failed to fetch product data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!params.id) {
      navigate.push("/");
    }
    fetchProductData();
  }, []);

  return (
    <main>
      <Navbar />
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-40">
        {/* Main image - full width on mobile, first column on desktop */}
        <div className="image w-full lg:order-1">
          <div className="relative w-full bg-gray-100">
            <img
              src={product?.images[0]}
              className="object-cover w-full h-[20rem] sm:h-[25rem] md:h-[30rem] lg:h-[35rem] xl:h-[45rem] cursor-pointer"
              alt={product?.title}
            />
          </div>
        </div>

        {/* Product details - full width on mobile, second column on desktop */}
        <div className="details w-full lg:w-auto h-auto lg:h-[45rem] flex flex-col items-center justify-center gap-6 lg:gap-10 lg:ml-8 xl:ml-36 lg:order-2">
          <div className="upper-sec w-full border-b border-[rgba(0,0,0,0.7)] pb-6 md:pb-8">
            <div className="flex items-start justify-between">
              <div
                className="font-clashRegular uppercase text-base sm:text-lg w-[80%]"
                style={{ wordSpacing: "0.1rem" }}
              >
                {product?.title}
              </div>
              <div className="cursor-pointer">
                <RiBookmarkLine size={16} className="text-neutral-600 mt-1.5" />
              </div>
            </div>
            <div className="price mt-4">
              <div className="font-clashRegular text-lg">
                $ {product?.price}
              </div>
              <div className="tax uppercase text-xs font-clashLight">
                mrp incl of all taxes
              </div>
            </div>
          </div>

          <div className="add w-full">
            <div
              onClick={() => addToCart(String(product?.id))}
              className="uppercase border border-black text-center font-clashRegular cursor-pointer text-xs py-2.5 sm:py-2 tracking-wide btn"
            >
              add
            </div>
          </div>

          <div className="dec">
            <p className="font-gilLight text-sm md:text-base">
              {product?.description}
            </p>
          </div>
        </div>

        {/* Description section - full width on mobile, first column on desktop (below image) */}
        <div className="detail w-full lg:w-auto h-auto lg:h-[45rem] flex items-center lg:items-center justify-center lg:justify-start lg:order-3 lg:pt-10">
          <p className="font-gilLight text-sm md:text-base text-justify lg:text-left">
            {product?.description}
          </p>
        </div>

        {/* Second image - full width on mobile, second column on desktop (below details) */}
        <div className="image w-full lg:order-4">
          <div className="relative w-full bg-gray-100">
            <img
              src={product?.images[1]}
              className="object-cover w-full h-[20rem] sm:h-[25rem] md:h-[30rem] lg:h-[35rem] xl:h-[45rem] cursor-pointer"
              alt={product?.title}
            />
          </div>
        </div>

        {/* Third image - full width on mobile, first column on desktop (below description) */}
        <div className="image w-full lg:order-5">
          <div className="relative w-full bg-gray-100">
            <img
              src={product?.images[2]}
              className="object-cover w-full h-[20rem] sm:h-[25rem] md:h-[30rem] lg:h-[35rem] xl:h-[45rem] cursor-pointer"
              alt={product?.title}
            />
          </div>
        </div>

        {/* Fourth image - full width on mobile, second column on desktop (below second image) */}
        <div className="image w-full lg:order-6">
          <div className="relative w-full bg-gray-100">
            <img
              src={product?.images[0]}
              className="object-cover w-full h-[20rem] sm:h-[25rem] md:h-[30rem] lg:h-[35rem] xl:h-[45rem] cursor-pointer"
              alt={product?.title}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Product;
