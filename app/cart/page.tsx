"use client";
import Navbar from "@/components/layout/Navbar/Navbar";
import { RootState } from "@/libs/store";
import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItem = useSelector((state: RootState) => state.dataSlice.cart);
  console.log(cartItem);
  return (
    <main>
      <Navbar />

      <section>Cart</section>
    </main>
  );
};

export default Cart;
