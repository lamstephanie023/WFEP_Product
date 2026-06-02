"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useCart } from "@/context/CartContext";

function CartRedirect() {
  const router = useRouter();
  const params = useSearchParams();
  const { addToCart } = useCart();

  useEffect(() => {
    const qty = Math.max(1, parseInt(params.get("qty") || "1", 10));
    const subscribe = params.get("subscribe") === "true";
    addToCart(qty, subscribe);
    router.replace("/product");
  }, [params, addToCart, router]);

  return null;
}

export default function CartPage() {
  return (
    <Suspense fallback={null}>
      <CartRedirect />
    </Suspense>
  );
}
