"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import React from "react";

const useSmoothTransition = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const smoothPush = (href: string) => {
    router.prefetch(href);

    startTransition(() => {
      router.push(href);
    });
  };

  return { smoothPush, isPending };
};

export default useSmoothTransition;
