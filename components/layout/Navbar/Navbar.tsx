"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const navigate = useRouter();

  return (
    <header>
      <div className="max-w-7xl lg:max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="logo">
          <Link
            href="/"
            className="font-against tracking-[-0.2rem] lg:tracking-[-0.5rem] uppercase text-3xl sm:text-4xl md:text-5xl lg:text-8xl"
          >
            sarojini
          </Link>
        </div>

        <div className="flex items-center justify-center gap-24">
          <div className="search-input">
            <input
              type="text"
              placeholder="Search"
              className="outline-none border-b border-neutral-500 font-clashRegular text-neutral-900 text-sm py-1"
            />
          </div>
          <div className="flex items-center justify-center gap-8">
            <div
              onClick={() => navigate.push("/auth/Login")}
              className="cursor-pointer font-clashRegular text-sm text-neutral-500 uppercase whitespace-nowrap login"
            >
              log in
            </div>
            <div
              onClick={() => navigate.push("/Cart")}
              className="cursor-pointer font-clashRegular text-sm text-neutral-500 uppercase whitespace-nowrap add-cart"
            >
              Bag
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
