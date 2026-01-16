"use client";
import Link from "next/link";
import "@/app/style/style.css";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Navbar = () => {
  const navigate = useRouter();
  const title = useRef(null);

  useEffect(() => {
    Animation();
  }, []);

  const Animation = () => {
    const tl = gsap.timeline();

    tl.to(title.current, {
      rotateX: "0deg",
      translateZ: 0,
      opacity: 1,
      transformOrigin: "bottom",
      ease: "power3",
      duration: 1.5,
    });
  };

  return (
    <header>
      <div className="max-w-7xl lg:max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="logo">
          <div
            ref={title}
            onClick={() => navigate.push("/")}
            className="font-against cursor-pointer tracking-[-0.2rem] lg:tracking-[-0.5rem] uppercase text-3xl sm:text-4xl md:text-5xl lg:text-8xl title"
          >
            sarojini
          </div>
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
              onClick={() => navigate.push("/cart")}
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
