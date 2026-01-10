"use client";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { RiBookmarkLine } from "@remixicon/react";
import { useRouter } from "next/navigation";

const CategoryPage = ({ params }: { params: { slug: string } }) => {
  const navigate = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`https://api.escuelajs.co/api/v1/products`);

      // const filteredProducts = res.data.filter(
      //   (product: any) => product.category?.name?.toLowerCase() === params.slug
      // );

      setProducts(res.data);
      setLoading(false);
    } catch (error: any) {
      console.error(error.message);
      setLoading(false);
    }
  };
  console.log(products);

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto py-8">
        {/* Page title skeleton */}
        <Skeleton className="h-9 w-48 mb-8" />

        {/* Product grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-3">
              {/* Image skeleton */}
              <Skeleton className="h-64 w-full rounded-lg" />

              {/* Text skeletons */}
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />

              {/* Price and button skeleton */}
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-10 w-24 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-8 mt-20">
      {/* <h1 className="font-gilRegular text-3xl font-bold mb-8">All Products</h1> */}

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4 space-y-20">
          {products.map((product: any) => (
            <div
              onClick={() => navigate.push(`/product/${product.id}`)}
              key={product.id}
              className=""
            >
              <div className="header">
                <div className="relative w-full overflow-hidden">
                  {/* <Skeleton> */}
                  <img
                    src={product.images}
                    className="h-full w-full object-cover hover:scale-105 transition-all duration-300 cursor-pointer"
                    alt={product.title}
                  />
                  {/* </Skeleton> */}
                </div>
              </div>
              <div className="content mt-1.5">
                <div className="flex justify-between">
                  <div className="title font-gilRegular text-xs uppercase">
                    {product.title}
                  </div>
                  <div>
                    <RiBookmarkLine
                      className="text-xs cursor-pointer mr-1"
                      size={11}
                    />
                  </div>
                </div>
                <div className="price font-switzerLight text-sm">
                  $ {product.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found</p>
        </div>
      )}
    </section>
  );
};

export default CategoryPage;
