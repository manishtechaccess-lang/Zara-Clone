import React from "react";
import CategoryPage from "./category/[id]/page";
import Navbar from "@/components/layout/Navbar/Navbar";

const page = () => {
  return (
    <div>
      <Navbar />
      <CategoryPage />
    </div>
  );
};

export default page;
