"use client";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams, useRouter } from "next/navigation";
import ErrorToast from "@/components/custom/Toast/ErrorToast";
import Navbar from "@/components/layout/Navbar/Navbar";
import { RiBookLine, RiBookmarkLine } from "@remixicon/react";

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
  }, [params.id, navigate]);

  return (
    <main>
      <Navbar />
      <section className="grid grid-cols-2 gap-20 px-40">
        <div className="image w-full">
          <div className="relative w-full bg-gray-100">
            <img
              src={product?.images[0]}
              className="object-cover w-full h-[45rem] cursor-pointer"
              alt={product?.title}
            />
          </div>
        </div>
        <div className="details w-md h-[45rem] flex items-center justify-center flex-col gap-10 ml-36">
          <div className="upper-sec w-full border-b border-[rgba(0,0,0,0.7)] pb-8">
            <div className="flex items-start justify-between">
              <div
                className="font-clashRegular uppercase text-lg w-[80%]"
                style={{ wordSpacing: "0.1rem" }}
              >
                {product?.title}
              </div>
              <div className="cursor-pointer">
                {" "}
                <RiBookmarkLine
                  size={16}
                  className="text-neutral-600 mt-1.5"
                />{" "}
              </div>
            </div>
            <div className="price">
              <div className="font-clashRegular text-lg">
                $ {product?.price}
              </div>
              <div className="tax uppercase text-xs font-clashLight">
                mrp incl of all taxes
              </div>
            </div>
          </div>

          <div className="add w-full">
            <div className="uppercase border border-black text-center font-clashRegular cursor-pointer text-xs py-2 tracking-wide btn">
              add
            </div>
          </div>

          <div className="dec">
            <p className="font-gilLight text-sm">{product?.description}</p>
          </div>
        </div>

        <div className="detail w-md h-[45rem] flex items-center justify-center">
          <p className="font-gilLight text-sm text-justify">
            {product?.description}
          </p>
        </div>

        <div className="image w-full">
          <div className="relative w-full bg-gray-100">
            <img
              src={product?.images[1]}
              className="object-cover w-full h-[45rem] cursor-pointer"
              alt={product?.title}
            />
          </div>
        </div>
        <div className="image w-full">
          <div className="relative w-full bg-gray-100">
            <img
              src={product?.images[2]}
              className="object-cover w-full h-[45rem] cursor-pointer"
              alt={product?.title}
            />
          </div>
        </div>
        <div className="image w-full">
          <div className="relative w-full bg-gray-100">
            <img
              src={product?.images[0]}
              className="object-cover w-full h-[45rem] cursor-pointer"
              alt={product?.title}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Product;
