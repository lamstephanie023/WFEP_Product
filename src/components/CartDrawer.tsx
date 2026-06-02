"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { PRODUCT } from "@/lib/product";

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    qty,
    subscribe,
    step,
    setStep,
    setQty,
    resetCart,
  } = useCart();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const unitPrice = subscribe ? PRODUCT.price * 0.85 : PRODUCT.price;
  const subtotal = unitPrice * qty;
  const shipping = subtotal >= 75 ? 0 : 5.99;
  const total = subtotal + shipping;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        aria-label="Close cart"
        onClick={closeCart}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="relative flex max-h-[min(90vh,720px)] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/20"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="font-display text-lg font-semibold text-slate-900">
            {step === "cart" && "Your cart"}
            {step === "checkout" && "Checkout"}
            {step === "done" && "Order confirmed"}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {step === "done" ? (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-display mt-4 text-xl font-semibold text-slate-900">Thank you!</p>
              <p className="mt-2 text-sm text-slate-600">
                {name ? `Thanks, ${name}.` : "Thanks for your order."} A confirmation will be sent to{" "}
                {email || "your email"}. Demo checkout — no payment processed.
              </p>
              <button
                type="button"
                onClick={resetCart}
                className="mt-6 w-full rounded-full bg-teal-600 py-3 text-sm font-semibold text-white hover:bg-teal-700"
              >
                Continue shopping
              </button>
            </div>
          ) : step === "cart" ? (
            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <div className="flex gap-3">
                <div className="h-16 w-11 shrink-0 rounded-lg bg-gradient-to-b from-teal-500 to-teal-700" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900">{PRODUCT.name}</p>
                  <p className="text-xs text-slate-500">{PRODUCT.strength}</p>
                  {subscribe && (
                    <p className="mt-1 text-xs font-medium text-teal-700">Subscription — 15% off</p>
                  )}
                </div>
                <p className="shrink-0 font-semibold text-slate-900">${subtotal.toFixed(2)}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-slate-600">Quantity</span>
                <div className="flex items-center rounded-full border border-slate-200 bg-white">
                  <button
                    type="button"
                    className="px-3 py-1.5 text-slate-600 hover:text-slate-900"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="min-w-[1.5rem] text-center text-sm font-semibold">{qty}</span>
                  <button
                    type="button"
                    className="px-3 py-1.5 text-slate-600 hover:text-slate-900"
                    onClick={() => setQty(qty + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form
              id="cart-checkout-form"
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                setStep("done");
              }}
            >
              <div>
                <label className="text-sm font-medium text-slate-700">Full name</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Email</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Shipping address</label>
                <input
                  required
                  placeholder="Street, city, ZIP, country"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                />
              </div>
              <p className="text-xs text-slate-500">
                By placing your order you agree to our{" "}
                <Link href="/terms" className="text-teal-700 underline" onClick={closeCart}>
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-teal-700 underline" onClick={closeCart}>
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          )}
        </div>

        {step !== "done" && (
          <div className="border-t border-slate-100 bg-slate-50/80 px-5 py-4">
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between text-slate-600">
                <dt>Subtotal</dt>
                <dd>${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between text-slate-600">
                <dt>Shipping</dt>
                <dd>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-semibold text-slate-900">
                <dt>Total</dt>
                <dd>${total.toFixed(2)}</dd>
              </div>
            </dl>

            {step === "cart" ? (
              <button
                type="button"
                onClick={() => setStep("checkout")}
                className="mt-4 w-full rounded-full bg-teal-600 py-3 text-sm font-semibold text-white hover:bg-teal-700"
              >
                Proceed to checkout
              </button>
            ) : (
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep("cart")}
                  className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="cart-checkout-form"
                  className="flex-1 rounded-full bg-teal-600 py-3 text-sm font-semibold text-white hover:bg-teal-700"
                >
                  Place order (demo)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
